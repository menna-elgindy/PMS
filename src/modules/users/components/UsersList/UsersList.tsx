import { useEffect, useState } from "react";
import { axiosInstance, USERS_URLS } from "../../../../api";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../../../../interface/AuthResponse/AuthResponse";
import { AxiosError } from "axios";
import NoData from "../../../shared/components/NoData/NoData";
import { Link, useSearchParams } from "react-router-dom";
import { ApiResponseForUser, UsersFilterOptions, UsersListResponse } from "../../../../interface/users/ApiResponseForUser";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import { formatDate } from '../../../../helpers';
import Pagination from "../../../shared/components/Pagination/Pagination";

const UsersList = () => {






   const[pageNum,setPageNum]= useSearchParams()




  const [usersList, setUsersList] = useState<UsersListResponse[]>([]);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoadind] = useState<number>(0);

  // Function to fetch the list of users from the API
  const getAllUsers = async (params: UsersFilterOptions | null = null) => {
    if (counterLoading == 0) {
      setLoading(true);
      setCounterLoadind(1);
    }
    try {
      const response = await axiosInstance.get<ApiResponseForUser>(
        USERS_URLS.getAllUsersUrl,
        {
          params: {
            userName: params?.userName,
            email: params?.email,
            country: params?.country,
            groups: params?.groups,
            pageSize: params?.pageSize,
            pageNumber: params?.pageNumber,
          },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setNumOfRecords(response?.data?.totalNumberOfRecords);
      setUsersList(response.data?.data);
      setTotalNumberOfPages(response?.data?.totalNumberOfPages)
      setPageNum({pageNum:response?.data?.pageNumber})


      
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
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
    getAllUsers({pageNumber:pageNum.get('pageNum')})
    
  }, []);

  return (
    <>
    <div className='pt-5 w-100 ms-5 me-2 mx-auto'>
      <TableHeader from='user' title='USERS'/>
      {loading ? (
      <div className='d-flex justify-content-center'>
       <div className='spinner-border text-warning' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
) : (
  <div className="table-responsive p-5">
    {usersList.length > 0 ? (
<>
<table className="table table-striped table-borderless">
        <thead className="table-dark">
          <tr>
            <th className='table-header' scope="col">User Name</th>
            <th className='table-header' scope="col">Status</th>
            <th className='table-header' scope="col">Phone Number</th>
            <th className='table-header' scope="col">Email</th>
            <th className='table-header' scope="col">Date Created</th>
            <th className='table-header' scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td className='table-data'>{user.userName}</td>
              <td className='table-data'>
                {user.isActivated ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Non-Active</span>
                )}
              </td>
              <td className='table-data'>{user.phoneNumber}</td>
              <td className='table-data text-truncate' style={{ maxWidth: "150px" }}>
                {user.email}
              </td>
              <td className='table-data'>{formatDate (user.creationDate)}</td>
              <td className='table-data'>
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
      <Pagination pageNumber={Number(pageNum.get('pageNum'))} numOfRecords={numOfRecords} totalNumberOfPages={arrayOfPages} paginatedListFunction={getAllUsers}/>

</>
    ) : (
      <NoData />
    )}
  </div>
)}  
</div>
      
    </>
  );
};

export default UsersList;
