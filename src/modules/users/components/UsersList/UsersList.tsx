import { useCallback, useEffect, useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../api";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../../../../interface/AuthResponse/AuthResponse";
import { AxiosError } from "axios";
import NoData from "../../../shared/components/NoData/NoData";
import { Link, useSearchParams } from "react-router-dom";
import {
  getFilterUsersType,
  UsersFilterOptions,
  UsersListResponse,
} from "../../../../interface/users/ApiResponseForUser";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import { formatDate } from "../../../../helpers";
import Filtration from "../../../shared/components/Filtration/Filtration";
import useFetch from "../../../../hooks/useFetch";
import Pagination from "../../../shared/components/Pagination/Pagination";
import ViewDetailsModal from "../../../shared/components/ViewDetailsModal/ViewDetailsModal";
import UpDownArrows from "../../../shared/components/SvgIcons/SvgIcons";

const UsersList = () => {
  const [pageNum, setPageNum] = useSearchParams();

  const [usersList, setUsersList] = useState<UsersListResponse[]>([]);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoadind] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [view, setView] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>();

  const handleCloseDetails = () => setView(false);
  const [searchParams] = useSearchParams();

  const handleView = (id: number) => {
    console.log("projectid", id);
    setSelectedId(id);
    setView(true);
  };
  // Function to fetch the list of users from the API
  const getAllUsers = async (params: UsersFilterOptions | null = null) => {
    if (counterLoading == 0) {
      setLoading(true);
      setCounterLoadind(1);
    }
    try {
      const response = await axiosInstance.get(USERS_URLS.getAllUsersUrl, {
        params: {
          userName: params?.userName,
          email: params?.email,
          country: params?.country,
          groups: params?.groups,
          pageSize: params?.pageSize,
          pageNumber: params?.pageNumber,
        },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );

      setNumOfRecords(response?.data?.totalNumberOfRecords);
      setUsersList(response.data?.data);
      setPageNum({ pageNum: response?.data?.pageNumber });
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = useCallback(async () => {
    const response = await axiosInstance.get<getFilterUsersType>(
      USERS_URLS.FILTER_USERS,
      {
        params: {
          pageSize: 20,
          pageNumber: Number(pageNum.get("pageNum")),
          userName: searchParams.get("name") || null,
          email: searchParams.get("email") || null,
          country: searchParams.get("country") || null,
          groups: searchParams.get("groups") || null,
        },
      }
    );
    return response?.data;
  }, [searchParams,isActive]);
  // get with filter
  const { data: filteredUsers, loading: usersLoading } =
    useFetch<getFilterUsersType>(getFilteredUsers);
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
      setIsActive(response.data.isActivated)
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
    getAllUsers({ pageNumber: pageNum.get("pageNum"), pageSize: 20 });
  }, [isActive]);
  const viewUser = useCallback(async () => {
    const response = await axiosInstance.get<UsersListResponse>(
      USERS_URLS.GetUserByIdUrl(selectedId)
    );
    return response?.data;
  }, [selectedId,isActive]);

  const { data: selectedUser, loading: userLoading } =
    useFetch<UsersListResponse>(viewUser);
  const usersListToDisplay =
    filteredUsers !== null && !usersLoading && filteredUsers
      ? filteredUsers!.data
      : usersList;
  return (
    <>
      <div className="pt-5 w-100 ms-5 me-2 mx-auto">
        <TableHeader title="USERS" url="" from="user" />

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive ">
            <Filtration pageName="users" />
            {usersListToDisplay!.length > 0 ? (
              <>
                <table className="table table-striped table-borderless ">
                  <thead className="table-dark ">
                    <tr>
                      <th className="table-header" scope="col">
                        User Name <UpDownArrows />
                      </th>
                      <th className="table-header" scope="col">
                        Status <UpDownArrows />
                      </th>
                      <th className="table-header" scope="col">
                        Phone Number <UpDownArrows />
                      </th>
                      <th className="table-header" scope="col">
                        Email <UpDownArrows />
                      </th>
                      <th className="table-header" scope="col">
                        Date Created <UpDownArrows />
                      </th>
                      <th className="table-header" scope="col">
                        Actions <UpDownArrows />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersListToDisplay!.map((user) => (
                      <tr key={user.id}>
                        <td className="table-data">{user.userName}</td>
                        <td className="table-data">
                          {user.isActivated ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Non-Active</span>
                          )}
                        </td>
                        <td className="table-data">{user.phoneNumber}</td>
                        <td
                          className="table-data text-truncate"
                          style={{ maxWidth: "150px" }}
                        >
                          {user.email}
                        </td>
                        <td className="table-data">
                          {formatDate(user.creationDate)}
                        </td>
                        <td className="table-data">
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
                                  onClick={() => toggleActivation(+user.id)}
                                >
                                  <i className="fa fa-toggle-off mx-2"></i>
                                  {user.isActivated ? "Deactivate" : "Activate"}
                                </button>
                              </li>
                              <li>
                                <Link
                                  to=""
                                  state={{ type: "edit" }}
                                  className="dropdown-item text-success"
                                  onClick={() => handleView(+user.id)}
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
                <Pagination
                  pageNumber={Number(pageNum.get("pageNum"))}
                  numOfRecords={numOfRecords}
                  totalNumberOfPages={arrayOfPages}
                  paginatedListFunction={getAllUsers}
                  from="users"
                />
              </>
            ) : (
              <NoData />
            )}
          </div>
        )}
        <ViewDetailsModal
          userData={selectedUser}
          toggleShow={view}
          handleCloseDetails={handleCloseDetails}
          loading={userLoading}
        />
      </div>
    </>
  );
};

export default UsersList;
