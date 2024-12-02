import style from "./TaskForm.module.css";
import { useForm } from "react-hook-form";
import AddFormHeader from "../../../shared/components/AddFormHeader/AddFormHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddTaskPayload } from "../../../../interface/Add&EditResponse/Add&EditResponse";
import { toast } from "react-toastify";
import { axiosInstance, HEADERS, TASKS_URLS } from "../../../../api";
import { useEffect } from "react";

const TaskForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<AddTaskPayload>({ mode: "onChange" });
  let navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const isNewTask: boolean = !taskId;

  const onSubmit = async (data: AddTaskPayload) => {
    const parsedId = parseInt(taskId!, 10);
    try {
      await axiosInstance[isNewTask ? "post" : "put"](
        isNewTask ? TASKS_URLS.ADD_Task : TASKS_URLS.EDIT_TASK(parsedId),
        data,
        HEADERS
      );
      isNewTask
        ? toast.success("Task added successfully")
        : toast.success("Task updated successfully");
      navigate("/tasks");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!isNewTask) {
      const parsedId = parseInt(taskId!, 10);
      const getTask = async () => {
        const response = await axiosInstance.get(
          TASKS_URLS.GET_Task(parsedId),
          HEADERS
        );
        console.log(response);
        setValue("title", response?.data?.title);
        setValue("description", response?.data?.description);
        setValue("employeeId", response?.data?.employee?.id);
        setValue("projectId", response?.data?.project?.id);
      };
      getTask();
    }
  }, []);

  return (
    <div className={style["add-project-wrapper"]}>
      <AddFormHeader title="Task" link="Tasks" />
      <form className={style["form-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
        {/*title */}
        <div className={style["input-group"]}>
          <label>Title</label>
          <input
            type="text"
            className={style["form-input"]}
            placeholder="Name"
            aria-label="title"
            aria-describedby="basic-addon1"
            {...register("title", {
              required: "task titel is required",
            })}
          />
        </div>
        {errors.title && (
          <span className="text-danger ">{errors.title.message}</span>
        )}
        {/*description */}
        <div className={style["input-group"]}>
          <label>Description</label>
          <input
            type="text"
            className={style["form-input"]}
            placeholder="Description"
            aria-label="title"
            aria-describedby="basic-addon1"
            {...register("description", {
              required: "task description is required",
            })}
          />
        </div>
        {errors.description && (
          <span className="text-danger ">{errors.description.message}</span>
        )}

        <div className={style["select-inputs-wrapper"]}>
          {/*User */}
          <div className={style["selector-group"]}>
            <label>User</label>

            <select
              className={style["form-input"]}
              {...register("employeeId", {
                required: "User is required",
              })}
            >
              <option value="">No Users Selected</option>
              {/*TagsQuery?.tags?.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                        )*/}
            </select>
            {errors.employeeId && (
            <span className="text-danger ">{errors.employeeId.message}</span>
          )}
          </div>


          {/*Project */}
          <div className={style["selector-group"]}>
            <label>Project</label>

            <select
              className={style["form-input"]}
              {...register("projectId", {
                required: "Project is required",
              })}
            >
              <option value="">No Status Selected</option>
              {/*TagsQuery?.tags?.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                        )*/}
            </select>
            {errors.projectId && (
            <span className="text-danger ">{errors.projectId.message}</span>
          )}
          </div>

        </div>

        <div className={style["btns-wrapper"]}>
          <Link to="/projects" className={style["cancle-btn"]}>
            Cancle
          </Link>
          <button
            disabled={isSubmitting}
            type="submit"
            className={style["save-btn"]}
          >
            {isSubmitting ? "...Loading" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
