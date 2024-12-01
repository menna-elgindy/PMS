import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance, PROJECTS_URLS } from "../../../../api";
import useFetch from "../../../../hooks/useFetch";
import Filtration from "../../../shared/components/Filtration/Filtration";

export interface getProjectsType {
  pageNumber: string;
  pageSize: string;
  data: [
    {
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
    }
  ];
}

const ProjectsList = () => {
  const [searchParams] = useSearchParams();
  const getFilteredProjects = useCallback(async () => {
    const response = await axiosInstance.get<getProjectsType>(
      PROJECTS_URLS.FILTER_PROJECTS,
      {
        params: {
          // pageSize: pageSize,
          // pageNumber: pageNumber,
          // title: name,
          pageSize: searchParams.get("limit") || 3,
          pageNumber: searchParams.get("page") || 1,
          title: searchParams.get("name") || null,
        },
      }
    );
    return response?.data;
  }, [searchParams]);

  const { data: filteredProjects, loading: usersLoading } =
    useFetch<getProjectsType>(getFilteredProjects);
  console.log(filteredProjects);
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
    </div>
  );
};

export default ProjectsList;
