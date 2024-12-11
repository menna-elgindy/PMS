import { useEffect, useState } from "react";
import style from "./TaskBoard.module.css";
import { axiosInstance, TASKS_URLS } from "../../../../api";
import {
  Status,
  Task,
  UserTasksResponse,
} from "../../../../interface/TaskBoardResponse/TaskBoardResponse";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function TaskBoard() {
  const [task, setTask] = useState<Task[]>([]);

  const tasksToDo = task.filter(({ status }) => status == "ToDo");
  const tasksInProgress = task.filter(({ status }) => status == "InProgress");
  const tasksDone = task.filter(({ status }) => status == "Done");
  const getAllAssignedTasks = async () => {
    try {
      let res = await axiosInstance.get<UserTasksResponse>(
        TASKS_URLS.GET_ASSIGNED_TASKS
      );
      console.log(res.data?.data);
      setTask(res.data?.data);
    } catch (error: any) {
      toast.error(error.response.data.message || "something went wrong");
    }
  };
  useEffect(() => {
    getAllAssignedTasks();
  }, []);

  return (
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
      <div className={style["title-wrapper"]}>
        <h1 className={style["title"]}>Task Board</h1>
      </div>
      <main className={style["task-board"]}>
        <Column
          title="ToDo"
          tasks={tasksToDo}
          refetchTasks={getAllAssignedTasks}
          setTask={setTask}
        />
        <Column
          title="InProgress"
          tasks={tasksInProgress}
          refetchTasks={getAllAssignedTasks}
          setTask={setTask}
        />
        <Column
          title="Done"
          tasks={tasksDone}
          refetchTasks={getAllAssignedTasks}
          setTask={setTask}
        />
      </main>
    </div>
  );
}

const Column = ({
  title,
  tasks,
  refetchTasks,
  setTask,
}: {
  title: Status;
  tasks: Task[];
  refetchTasks: () => Promise<void>;
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const changeStatus = async (id: number, status: string) => {
    try {
      await axiosInstance.put(TASKS_URLS.CHANGE_STATUS(id), { status });
      await refetchTasks();
      toast.success("status changed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "something went wrong");
    }
  };
  return (
    <div className={style["column"]}>
      <div className={style["column-title"]}>{title}</div>
      <motion.div
        layout={true}
        layoutId={title}
        key={title}
        className={style["cards-wrapper"]}
        onDrop={(e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData("taskId");
          const PrevStatus = e.dataTransfer.getData("PrevStatus");

          if (PrevStatus !== title) {
            setTask((prevTasks) => {
              const newTasks = prevTasks.map((task) => {
                if (task.id == +id) {
                  task.status = title;
                  return task;
                } else {
                  return task;
                }
              });
              return newTasks;
            });
            changeStatus(parseInt(id), title);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {tasks.map(({ title: taskTitle, id }) => (
          <motion.div
            layout={true}
            layoutId={id.toString()}
            draggable
            onDragStart={(e) => {
               // @ts-ignore 
              e.dataTransfer.setData("taskId", id.toString());
               // @ts-ignore 
              e.dataTransfer.setData("prevStatus", title);
            }}
            key={id}
            className={style["card"]}
          >
            {taskTitle}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
