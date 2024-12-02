import { useCallback } from "react";
import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import useFetch from "../../../../hooks/useFetch";
// import Filtration from "../../../shared/components/Filtration/Filtration";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";
import ViewDetailsModal from "../../../shared/components/ViewDetailsModal/ViewDetailsModal";

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
  const viewProject = useCallback(async () => {
    const response = await axiosInstance.get<ProjectType>(
      PROJECTS_URLS.GET_PROJECT("1015")
    );
    return response?.data;
  }, []);
  const { data: selectedProject, loading: projectLoading } =
    useFetch<ProjectType>(viewProject);
  // const { data: filteredProjects, loading: usersLoading } =
  //   useFetch<getProjectsType>(getFilteredProjects);

  return (
    <div className="container">
      {/* <Filtration
        pageName="projects"
        query={{
          triggerUsers: () => null,
          triggerProjects: getFilteredProjects,
          triggerTasks: () => null,
        }}
      /> */}
      {/* {!usersLoading && (
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
      )} */}
      {/* <DeleteConfirmation
        deleteItem={"Project"}
        deleteFun={deleteProject}
        toggleShow={true}
        handleClose={() => {}}
      /> */}
      <ViewDetailsModal
        data={selectedProject}
        toggleShow={true}
        handleCloseDetails={() => {}}
        loading={projectLoading}
      />
    </div>
  );
};

export default ProjectsList;
