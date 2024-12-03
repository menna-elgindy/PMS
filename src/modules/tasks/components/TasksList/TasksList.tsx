import { useCallback, useState } from "react";
import ViewDetailsModal from "../../../shared/components/ViewDetailsModal/ViewDetailsModal";
import { axiosInstance, TASKS_URLS } from "../../../../api";
import useFetch from "../../../../hooks/useFetch";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
  };
}
const TasksList = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [view, setView] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDetails = () => setView(false);
  const handleClose = () => setShowDelete(false);

  const handleView = (id: number) => {
    setSelectedId(id);
    setView(true);
  };
  const deleteTask = async () => {
    try {
      const response = await axiosInstance.delete(TASKS_URLS.DELETE_TASK(1015));
      if (response?.data.affected !== 0) {
        toast.success("Task deleted successfully");
        // taskQuery?.triggerTasks(params.get("page") || 1);
        // getTasks();
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

  return (
    <div>
      TasksList
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
  );
};

export default TasksList;
