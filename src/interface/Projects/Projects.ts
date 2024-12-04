export interface ProjectsType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
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
  // task: object[];
} 
export interface ManagerType {
  id: string;
  userName: string;
  phoneNumber: string;
  email: string;
  imagePath: string;
}
export interface getProjectTypes {
  id: number;
  title: string;
  description: string;
  creationDate: string;
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

export interface getProjectsType {
  // pageNumber?: number;
  pageNumber: number;
  pageSize: string;
  data: ProjectsType[];
}
