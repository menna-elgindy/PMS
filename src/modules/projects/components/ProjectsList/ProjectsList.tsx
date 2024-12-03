import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../../../../helpers";
import {
  getProjectsType,
  ProjectsType,
} from "../../../../interface/Projects/Projects";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import TableActions from "../../../shared/components/TableActions/TableActions";
import Pagination from "../../../shared/components/Pagination/Pagination";
import { UsersFilterOptions } from "../../../../interface/users/ApiResponseForUser";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import Filtration from "../../../shared/components/Filtration/Filtration";

const ProjectsList = () => {

  const[pageNum,setPageNum]= useSearchParams()

  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [view, setView] = useState(false);
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [numberOfRecords, setNumOfRecords] = useState(0)
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)
  const [searchParams] = useSearchParams();

  const handleClose = () => setShowDelete(false);
  const handleShowDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleShowEdit = (id: number) => {
    console.log(id);
  };
  const handleView = (id: number) => {
    setSelectedId(id);
    setView(true);
  };


  const getFilteredProjects = useCallback(async () => {
    const response = await axiosInstance.get<getProjectsType>(
      PROJECTS_URLS.FILTER_PROJECTS,
      {
        params: {
          pageSize: 5,
          pageNumber: Number(pageNum.get('pageNum')),
          title: searchParams.get("name") || null,
        },
      }
    );
    return response?.data;
  }, [searchParams]);
  const { data: filteredProjects, loading: projectsLoading } =
    useFetch<getProjectsType>(getFilteredProjects);

  const getProjects = async (params: UsersFilterOptions | null = null) => {
    try {
      setLoading(true);
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
      console.log(response.data);
      setPageNum({pageNum:response?.data?.pageNumber})

      setNumOfRecords(response?.data?.totalNumberOfRecords)
      setTotalNumberOfPages(response?.data?.totalNumberOfPages)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects({pageNumber:pageNum.get('pageNum')});
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

  const projectsList =
    filteredProjects !== null && !projectsLoading
      ? filteredProjects!.data.map((project: ProjectsType) => (
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
        ))
      : projectsData?.map((project: ProjectsType) => (
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
          <Pagination  paginatedListFunction={getProjects} numOfRecords={numberOfRecords}  totalNumberOfPages={arrayOfPages}pageNumber={Number(pageNum.get('pageNum'))}/>
          
        </div>
      )}
      <DeleteConfirmation
        deleteItem={"Project"}
        deleteFun={deleteProject}
        toggleShow={showDelete}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProjectsList;
