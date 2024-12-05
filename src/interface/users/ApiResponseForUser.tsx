export interface ApiResponseForUser {
  pageNumber?: number | string[] | undefined;
  data: UsersListResponse[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface UsersListResponse {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
  imagePath?: string;
  group?: Group;
}
interface Group {
  name: string;
}
export interface UsersFilterOptions {
  userName?: string;
  email?: string;
  country?: string;
  groups?: 1 | 2;
  pageSize?: number;
  pageNumber?: number | string | null;
  title?: string | null;
}
export interface getFilterUsersType {
  pageNumber?: string;
  pageSize?: string;
  data?: [
    {
      id: string;
      userName: string;
      email: string;
      country: string;
      phoneNumber: string;
      isActivated: boolean;
      creationDate: string;
    }
  ];
}
