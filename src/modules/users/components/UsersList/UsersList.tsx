import { useEffect, useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../api";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../../../../interface/AuthResponse/AuthResponse";
import { AxiosError } from "axios";
import NoData from "../../../shared/components/NoData/NoData";
import { Link } from "react-router-dom";
import { UsersListResponse } from "../../../../interface/users/ApiResponseForUser";

const UsersList = () => {
  const [usersList, setUsersList] = useState<UsersListResponse[]>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(USERS_URLS.getAllUsersUrl, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsersList(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const toggleActivation = async (id: number) => {
    try {
      const response = await axiosInstance.put(
        USERS_URLS.toggleUserUrl(id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getAllUsers();
      const { isActivated } = response.data;
      toast.success(
        `User has been ${
          isActivated ? "activated" : "deactivated"
        } successfully.`
      );
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message || "An error occurred");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="table-responsive p-5">
        {usersList.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Status</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Date Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td className="px-3">{user.userName}</td>
                  <td className="px-3">
                    {user.isActivated ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Non-Active</span>
                    )}
                  </td>
                  <td className="px-3">{user.phoneNumber}</td>
                  <td className="px-3 text-truncate" style={{ maxWidth: "150px" }}>
                    {user.email}
                  </td>
                  <td className="px-3">{user.creationDate}</td>
                  <td className="px-3">
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-light border dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton-${user.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton-${user.id}`}
                      >
                        <li>
                          <button
                            className="dropdown-item text-primary"
                            onClick={() => toggleActivation(user.id)}
                          >
                            <i className="fa fa-toggle-off mx-2"></i>
                            {user.isActivated ? "Deactivate" : "Activate"}
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item text-danger">
                            <i className="fa fa-ban mx-2"></i>
                            Block
                          </button>
                        </li>
                        <li>
                          <Link
                            to=""
                            state={{ type: "edit" }}
                            className="dropdown-item text-success"
                          >
                            <i className="fa fa-eye mx-2"></i>
                            View
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default UsersList;
