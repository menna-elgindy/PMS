import { useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../../../api";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import { ParamsType } from "../../../../interface/Tasks/Tasks";
import NoData from "../../../shared/components/NoData/NoData";
import { formatDate } from "../../../../helpers";
import "./TasksList.css";
import { useCallback } from "react";
import ViewDetailsModal from "../../../shared/components/ViewDetailsModal/ViewDetailsModal";
import useFetch from "../../../../hooks/useFetch";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../shared/components/Pagination/Pagination";
import TableActions from "../../../shared/components/TableActions/TableActions";
import Filtration from "../../../shared/components/Filtration/Filtration";

export interface getTaskTypes {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  employee: {
    userName: string;
    imagePath: string;
    email: string;
  };
  project: {
    title: string;
    description: string;
  };
}
interface getTasks {
  pageNumber: number;
  pageSize: string;
  data: getTaskTypes[];
}
const TasksList = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [view, setView] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDetails = () => setView(false);
  const handleClose = () => setShowDelete(false);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [numOfRecords, setNumOfRecords] = useState<number>(0);
  const [pageNum, setPageNum] = useSearchParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleShowDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  const handleShowEdit = (id: number) => {
    navigate(`${id}`);
    console.log(id);
  };

  const handleView = (id: number) => {
    setSelectedId(id);
    setView(true);
  };
  const getFilteredTasks = useCallback(async () => {
    const response = await axiosInstance.get<getTasks>(TASKS_URLS.get_All, {
      params: {
        pageSize: 5,
        pageNumber: pageNum.get("pageNum"),
        title: searchParams.get("name") || null,
        status: searchParams.get("status") || null,
      },
    });
    return response?.data;
  }, [pageNum, searchParams]);
  const { data: filteredTasks, loading: tasksLoading } =
    useFetch<getTasks>(getFilteredTasks);

  const deleteTask = async () => {
    try {
      const response = await axiosInstance.delete(
        TASKS_URLS.DELETE_TASK(selectedId)
      );
      if (response?.data.affected !== 0) {
        toast.success("Task deleted successfully");
        // taskQuery?.triggerTasks(params.get("page") || 1);
        getTasksList();
      } else {
        toast.error("Task not found");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message || "something went wrong");
        }
      } else toast.error("An unknown error occurred");
    }
    handleClose();
  };
  const viewTask = useCallback(async () => {
    const response = await axiosInstance.get<getTaskTypes>(
      TASKS_URLS.GET_Task(selectedId)
    );
    return response?.data;
  }, [selectedId]);

  const { data: selectedTask, loading: taskLoading } =
    useFetch<getTaskTypes>(viewTask);

  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  ////////////////////getTasksList///////////////////////////////////////////////

  const getTasksList = async (params: ParamsType | null = null) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(TASKS_URLS.get_All, {
        params: {
          pageSize: params?.pageSize,
          pageNumber: params?.pageNumber,
          title: params?.title,
          status: params?.status,
        },
      });

      setTasksList(response.data.data);
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );

      setNumOfRecords(response?.data?.totalNumberOfRecords);
      setPageNum({ pageNum: response?.data?.pageNumber });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksList({
      pageNumber: pageNum.get("pageNum"),
      pageSize: 5,
    });
  }, []);

  const tasksListToDisplay =
    filteredTasks !== null && !tasksLoading && filteredTasks
      ? filteredTasks.data
      : tasksList;

  const taskList =
    tasksList.length > 0 ? (
      tasksListToDisplay.map((task: getTaskTypes) => (
        <tr key={task.id}>
          <td className="table-data">{task.title}</td>
          <td className="table-data">
            <span
              className={`${
                task.status === "ToDo"
                  ? "status-todo"
                  : task.status === "InProgress"
                  ? "status-inprogress"
                  : "status-done"
              }`}
            >
              {task.status}
            </span>
          </td>
          <td className="table-data">{task.employee.userName}</td>
          <td className="table-data">{task.project.description}</td>
          <td className="table-data">{formatDate(task.creationDate)}</td>
          <td className="table-data">
            <TableActions
              handleShowDelete={() => handleShowDelete(task.id)}
              handleShowEdit={() => handleShowEdit(task.id)}
              handleShow={() => handleView(task.id)}
              itemName={task.title}
            />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6}>
          <NoData />
        </td>
      </tr>
    );

  return (
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
      {" "}
      <TableHeader title="Tasks" btnTitle="Add New Task" url="new-task" />
      <Filtration pageName="tasks" />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-borderless">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Statues</th>
                <th className="table-header">User</th>
                <th className="table-header">Project</th>
                <th className="table-header">Date Created</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>{taskList}</tbody>
          </table>
          <Pagination
            pageNumber={Number(searchParams.get("pageNum"))}
            numOfRecords={numOfRecords}
            totalNumberOfPages={arrayOfPages}
            paginatedListFunction={getTasksList}
          />
        </div>
      )}
      <div>
        <DeleteConfirmation
          deleteItem={"Task"}
          deleteFun={deleteTask}
          toggleShow={showDelete}
          handleClose={handleClose}
        />
        <ViewDetailsModal
          taskData={selectedTask}
          toggleShow={view}
          handleCloseDetails={handleCloseDetails}
          loading={taskLoading}
        />
      </div>
    </div>
  );
};

export default TasksList;
