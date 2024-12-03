import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import useFetch from "../../../../hooks/useFetch";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../../../../helpers";
import {
  getProjectTypes,
  getProjectsType,
  ProjectsType,
} from "../../../../interface/Projects/Projects";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import TableActions from "../../../shared/components/TableActions/TableActions";
import Pagination from "../../../shared/components/Pagination/Pagination";
import { UsersFilterOptions } from "../../../../interface/users/ApiResponseForUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filtration from "../../../shared/components/Filtration/Filtration";
import ViewDetailsModal from "../../../shared/components/ViewDetailsModal/ViewDetailsModal";

const ProjectsList = () => {
  const [pageNum, setPageNum] = useSearchParams();
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [showDelete, setShowDelete] = useState(false);
  const [view, setView] = useState(false);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numberOfRecords, setNumOfRecords] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(0);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleClose = () => setShowDelete(false);

  const handleCloseDetails = () => setView(false);

  const handleShowDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleShowEdit = (id: number) => {
    navigate(`${id}`);
    console.log(id);
  };

  const handleView = (id: number) => {
    setSelectedId(id);
    setView(true);
  };
  const getProjects = async (params: UsersFilterOptions | null = null) => {
    try {
      const response = await axiosInstance.get(
        PROJECTS_URLS.list , {
          params : {
            pageSize: params?.pageSize,
            pageNumber: params?.pageNumber,
          }
        }
      );
      setProjectsData(response.data.data);
      setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
      setPageNum({pageNum:response?.data?.pageNumber})

      setNumOfRecords(response?.data?.totalNumberOfRecords)
      setTotalNumberOfPages(response?.data?.totalNumberOfPages)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const getFilteredProjects = useCallback(async () => {
    const response = await axiosInstance.get<getProjectsType>(
      PROJECTS_URLS.FILTER_PROJECTS,
      {
        params: {
          pageSize: 5,
          pageNumber: Number(searchParams.get("pageNum")),
          title: searchParams.get("name"),
        },
      }
    );
    return response?.data;
  }, [searchParams]);
  const { data: filteredProjects, loading: projectsLoading } =
    useFetch<getProjectsType>(getFilteredProjects);
  useEffect(() => {
    getProjects({pageNumber:pageNum.get('pageNum'),pageSize:5});
  }, []);

  const deleteProject = async () => {
    try {
      const response = await axiosInstance.delete(
        PROJECTS_URLS.DELETE_PROJECT(selectedId)
      );
      if (response?.data.affected !== 0) {
        toast.success("Project deleted successfully");
        // projectQuery?.triggerProjects(params.get("page") || 1);
        getProjects();
      } else {
        toast.error("Project not found");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message || "something went wrong");
        }
      } else toast.error("An unknown error occurred");
    }
    handleClose();
  };
  const viewProject = useCallback(async () => {
    const response = await axiosInstance.get<getProjectTypes>(
      PROJECTS_URLS.GET_PROJECT(selectedId)
    );
    return response?.data;
  }, [selectedId]);
  const { data: selectedProject, loading: projectLoading } =
    useFetch<getProjectTypes>(viewProject);

  useEffect(() => {
    getProjects({ pageNumber: Number(pageNum.get("pageNum")) });
  }, []);

  const projectsListToDisplay =
    filteredProjects !== null && !projectsLoading && filteredProjects
      ? filteredProjects!.data
      : projectsData;

  const projectsList = projectsListToDisplay?.map((project: ProjectsType) => (
    <tr key={project.id}>
      <td className="table-data">{project.title}</td>
      <td className="table-data">{project.description}</td>
      <td className="table-data">{project.task.length}</td>
      <td className="table-data">{formatDate(project.creationDate)}</td>
      <td className="table-data cursor-pointer">
        <TableActions
          handleShowDelete={() => handleShowDelete(project.id)}
          handleShowEdit={() => handleShowEdit(project.id)}
          handleShow={() => handleView(project.id)}
          itemName={project.title}
        />
      </td>
    </tr>
  ));

  return (
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
      <TableHeader
        title="Projects"
        btnTitle="Add New Project"
        url="new-project"
      />
      <Filtration pageName="projects" />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-borderless">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Description</th>
                <th className="table-header">Num Tasks</th>
                <th className="table-header">Date Created</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>{projectsList}</tbody>
          </table>
          <Pagination
            paginatedListFunction={getProjects}
            numOfRecords={numberOfRecords}
            totalNumberOfPages={arrayOfPages}
            pageNumber={Number(searchParams.get("pageNum"))}
          />
        </div>
      )}
      <DeleteConfirmation
        deleteItem={"Project"}
        deleteFun={deleteProject}
        toggleShow={showDelete}
        handleClose={handleClose}
      />
      <ViewDetailsModal
        projectData={selectedProject}
        toggleShow={view}
        handleCloseDetails={handleCloseDetails}
        loading={projectLoading}
      />
    </div>
  );
};

export default ProjectsList;
