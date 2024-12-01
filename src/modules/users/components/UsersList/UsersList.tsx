import { useCallback } from "react";
import { axiosInstance, USERS_URLS } from "../../../../api";
import Filtration from "../../../shared/components/Filtration/Filtration";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

export interface getUsersType {
  pageNumber: string;
  pageSize: string;
  data: [
    {
      id: string;
      userName: string;
      email: string;
      country: string;
      phoneNumber: string;
    }
  ];
}
const UsersList = () => {
  const [searchParams] = useSearchParams();
  const getFilteredUsers = useCallback(async () => {
    const response = await axiosInstance.get<getUsersType>(
      USERS_URLS.FILTER_USERS,
      {
        params: {
          pageSize: searchParams.get("limit") || 3,
          pageNumber: searchParams.get("page") || 1,
          userName: searchParams.get("name") || null,
          email: searchParams.get("email") || null,
          country: searchParams.get("country") || null,
          groups: searchParams.get("groups") || null,
        },
      }
    );
    return response?.data;
  }, [searchParams]);

  const { data: filteredUsers, loading: usersLoading } =
    useFetch<getUsersType>(getFilteredUsers);
  console.log(filteredUsers);
  return (
    <div className="container">
      <Filtration
        pageName="users"
        query={{
          triggerUsers: getFilteredUsers,
          triggerProjects: () => null,
          triggerTasks: () => null,
        }}
      />
      {!usersLoading && (
        <div>
          {filteredUsers?.data.map((user) => (
            <div key={user.id}>
              {user.userName}
              <hr />
              {user.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
