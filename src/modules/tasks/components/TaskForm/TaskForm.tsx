import style from "./TaskForm.module.css";
import {  useForm } from "react-hook-form";
import AddFormHeader from "../../../shared/components/AddFormHeader/AddFormHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddTaskPayload } from "../../../../interface/Add&EditResponse/Add&EditResponse";
import { toast } from "react-toastify";
import {
  axiosInstance,
  HEADERS,
  PROJECTS_URLS,
  TASKS_URLS,
  USERS_URLS,
} from "../../../../api";
import { useEffect, useState } from "react";
import { ProjectsType } from "../../../../interface/Projects/Projects";
import {
  ApiResponseForUser,
  UsersListResponse,
} from "../../../../interface/users/ApiResponseForUser";


//import Select from "react-select";

const TaskForm = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [usersList, setUsersList] = useState<UsersListResponse[]>([]);

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
      let res = await axiosInstance[isNewTask ? "post" : "put"](
        isNewTask ? TASKS_URLS.ADD_Task : TASKS_URLS.EDIT_TASK(parsedId),
        data,
        HEADERS
      );
      isNewTask
        ? toast.success("Task added successfully")
        : toast.success("Task updated successfully");
      console.log(res.data);
      navigate("/tasks");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axiosInstance.get(
          `${PROJECTS_URLS.list}?pageSize=10000&pageNumber=1`
        );
        setProjectsData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();

    const getUsers = async () => {
      try {
        const response = await axiosInstance.get<ApiResponseForUser>(
          `${USERS_URLS.getAllUsersUrl}?pageSize=10000&pageNumber=1`
        );
        setUsersList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

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
    <div className="pt-5 w-100 ms-5 me-2 mx-auto">
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

            {/*<Controller
              name="employeeId"
              control={control}
              rules={{ required: "User is required" }}
              render={({ field, fieldState: { error } }) => {
                const selectedValue = usersList.find((option) => option.id === field.value); 
                return(
                <>
                  <Select
                    {...field}
                     options={usersList?.map(({ id, userName }) => ({
                        value: id,
                        label: userName,
                      })) as { value: number; label: string }[]}
                    value={selectedValue && { value: selectedValue.id, label: selectedValue.userName } }
                    placeholder="No Users Selected"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                  />
                  {error && (
                    <span className="text-danger">{error.message}</span>
                  )}
                </>
              )}}
            />*/}

            <select
              className={style["form-input"]}
              {...register("employeeId", {
                required: "User is required",
              })}
            >
              <option value="">No Users Selected</option>
              {usersList?.map((user: UsersListResponse) => (
                <option
                  key={user.id}
                  value={user.id}
                  className={style["option-item"]}
                >
                  {user.userName}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <span className="text-danger">{errors.employeeId.message}</span>
            )}
          </div>

          {/*Project */}
          <div className={style["selector-group"]}>
            <label>Project</label>

            {/*<Controller
              name="projectId"
              control={control}
              rules={{ required: "Project is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    options={projectsData?.map(({ id, title }) => ({
                      value: id,
                      label: title,
                    }))}
                    placeholder="No Status Selected"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value)
                    }
                  />
                  {error && (
                    <span className="text-danger">{error.message}</span>
                  )}
                </>
              )}
            />*/}

            <select
              className={style["form-input"]}
              {...register("projectId", {
                required: "Project is required",
              })}
            >
              <option value="">No Status Selected</option>
              {projectsData?.map((project: ProjectsType) => (
                <option
                  key={project.id}
                  value={project.id}
                  className={style["option-item"]}
                >
                  {project.title}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <span className="text-danger">{errors.projectId.message}</span>
            )}
          </div>
        </div>

        <div className={style["btns-wrapper"]}>
          <Link to="/tasks" className={style["cancle-btn"]}>
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
