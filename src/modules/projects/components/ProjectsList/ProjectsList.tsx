import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../helpers";
import { ProjectsType } from "../../../../interface/Projects/Projects";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import TableActions from "../../../shared/components/TableActions/TableActions";
import NoData from "../../../shared/components/NoData/NoData";

const ProjectsList = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [view, setView] = useState(false);

  const handleClose = () => setShowDelete(false);
  const handleShowDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleShowEdit = (id: number) => {};
  const handleView = (id: number) => {
    setSelectedId(id);
    setView(true);
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${PROJECTS_URLS.list}?pageSize=10&pageNumber=1`
      );
      setProjectsData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
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
  // const handleDelete = async () => {
  //   try {
  //     // setIsLoading(true);
  //     const response = await axiosInstance.delete(
  //       PROJECTS_URLS.deleteProject(id)
  //     );
  //     // setShowDelete(false);
  //     getProjects();
  //     toast.success("Category deleted successfully");
  //     // setIsLoading(false);
  //   } catch (error) {
  //     toast.error("Can't delete this category");
  //   }
  // };

  const projectsList = projectsData.length >0 ? (projectsData.map((project: ProjectsType) => (
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
  ))):(
    <tr>
      <td colSpan="6">
        <NoData />
      </td>
    </tr>
  )

  return (
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
      <TableHeader
        title="Projects"
        btnTitle="Add New Project"
        url="new-project"
      />
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
