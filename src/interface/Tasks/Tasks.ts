/* export interface EmployeeType {
    userName: string;
  }
  export interface ProjectType {
    description: string;
  } 
 export interface tasksType {
    id: number;
    title: string;
    status: string;
    employee: EmployeeType;
    project: ProjectType;
    creationDate: string;
  }
 */
  export interface ParamsType {
    title?: string;
    status?: "ToDo" | "InProgress" | "Done" ;
    pageSize?: number;
    pageNumber?: number|string|null;
  }