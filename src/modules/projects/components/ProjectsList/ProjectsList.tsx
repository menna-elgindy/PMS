import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import useFetch from "../../../../hooks/useFetch";
import Filtration from "../../../shared/components/Filtration/Filtration";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: [
    {
      id: string;
      title: string;
      description: string;
      status: string;
      creationDate: string;
      modificationDate: string;
    }
  ];
  manager: ManagerType;
}
export interface ManagerType {
  id: string;
  userName: string;
  phoneNumber: string;
  email: string;
  imagePath: string;
}
export interface getProjectsType {
  pageNumber: string;
  pageSize: string;
  data: ProjectType[];
}

const ProjectsList = () => {
  const [searchParams] = useSearchParams();
  const getFilteredProjects = useCallback(async () => {
    const response = await axiosInstance.get<getProjectsType>(
      PROJECTS_URLS.FILTER_PROJECTS,
      {
        params: {
          pageSize: searchParams.get("limit") || 3,
          pageNumber: searchParams.get("page") || 1,
          title: searchParams.get("name") || null,
        },
      }
    );
    return response?.data;
  }, [searchParams]);
  // const viewProject = useCallback(async () => {
  //   const response = await axiosInstance.get<ProjectType>(
  //     PROJECTS_URLS.GET_PROJECT("1015")
  //   );
  //   return response?.data;
  // }, []);

  const { data: filteredProjects, loading: usersLoading } =
    useFetch<getProjectsType>(getFilteredProjects);
  // const { data: selectedProject, loading: projectLoading } =
  //   useFetch<ProjectType>(viewProject);

  const deleteProject = async () => {
    try {
      const response = await axiosInstance.delete(
        PROJECTS_URLS.DELETE_PROJECT("1018")
      );
      if (response?.data.affected !== 0) {
        toast.success("Project deleted successfully");
        // projectQuery?.triggerProjects(params.get("page") || 1);
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
    // handleClose();
  };
  // const ViewProject = async() => {
  //      try {
  //       const response = await axiosInstance.delete(
  //         PROJECTS_URLS.GET_PROJECT("1015")
  //       );
  //       if (response?.data.affected !== 0) {
  //         toast.success("Project deleted successfully");
  //         // projectQuery?.triggerProjects(params.get("page") || 1);
  //       } else {
  //         toast.error("Project not found");
  //       }
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         if (error.response) {
  //           toast.error(error.response.data.message || "something went wrong");
  //         }
  //       } else toast.error("An unknown error occurred");
  //     }
  // }

  return (
    <div className="container">
      <Filtration
        pageName="projects"
        query={{
          triggerUsers: () => null,
          triggerProjects: getFilteredProjects,
          triggerTasks: () => null,
        }}
      />
      {!usersLoading && (
        <div>
          {filteredProjects?.data.map((project) => (
            <div key={project.id}>
              {project.title}
              <hr />
              {project.task.map((task) => (
                <div key={task.id}>
                  task: {task.title}
                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <DeleteConfirmation
        deleteItem={"Project"}
        deleteFun={deleteProject}
        toggleShow={true}
        handleClose={() => {}}
      />
      {/* <ViewDetailsModal
        data={selectedProject}
        toggleShow={true}
        handleCloseDetails={() => {}}
        loading={projectLoading}
      /> */}
    </div>
  );
};

export default ProjectsList;
