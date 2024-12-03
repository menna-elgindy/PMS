import { useEffect, useState } from "react";
import { axiosInstance, TASKS_URLS } from "../../../../api";
import TableHeader from "../../../shared/components/TableHeader/TableHeader";
import { ParamsType, tasksType } from "../../../../interface/Tasks/Tasks";
import NoData from "../../../shared/components/NoData/NoData";
import { formatDate } from "../../../../helpers";
import './TasksList.css'

const TasksList = () => {
  const[tasksList , setTasksList] = useState([])
  const [loading, setLoading] = useState<boolean>(false);

  let getTasksList= async(params :ParamsType | null = null) =>{
    try {
      setLoading(true);
      const response =await axiosInstance.get(TASKS_URLS.get_All,
        {
          params: {
            pageSize:params?.pageSize,
            pageNumber:params?.pageNumber,
            title:params?.title,
            status:params?.status,
          },
        }
      )
      console.log(response?.data?.data)
      setTasksList(response.data.data)

      
    } catch (error) {
      console.log(error)
    }

   finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    getTasksList()

  },[])


  const taskList = tasksList.length > 0 ? (tasksList.map((task : tasksType) => (
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
      <td className="table-data">{}</td>
    </tr>
  ))):(
    <tr>
      <td colSpan="6">
        <NoData />
      </td>
    </tr>
  )

  return (
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
    <TableHeader
      title="Tasks"
      btnTitle="Add New Task"
      url="new-task"
    />
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
          <tbody> 
            {taskList}
         </tbody>
        </table>
      </div>
    )}

  </div>

  );
};

export default TasksList;
