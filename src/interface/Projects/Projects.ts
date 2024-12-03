export interface ProjectsType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  task: object[];
} 
export interface getProjectsType {
  pageNumber: string;
  pageSize: string;
  data: ProjectsType[];
}
