import { useCallback, useContext } from "react";
import { axiosInstance, TASKS_URLS, USERS_URLS } from "../../../api";
import useFetch from "../../../hooks/useFetch";
import StatsCard from "./StatsCard";
import DoughnutChart from "../../charts/components/DoughnutChart";
import styles from "./StatsSection.module.css";
import {
  ProgressIcon,
  ProjectNumberIcon,
  TaskNumberIcon,
} from "../../shared/components/SvgIcons/SvgIcons";
import { AuthContext } from "../../../context/AuthContext";

interface countTasksType {
  inProgress: number;
  toDo: number;
  done: number;
}
interface countUsersType {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}
const StatsSection = () => {
  const countTasks = useCallback(async () => {
    const response = await axiosInstance.get<countTasksType>(
      TASKS_URLS.COUNT_TASKS
    );
    return response?.data;
  }, []);
  const countUsers = useCallback(async () => {
    if (loginData?.userGroup !== "Manager") return {} as countUsersType;
    const response = await axiosInstance.get<countUsersType>(
      USERS_URLS.COUNT_USERS
    );
    return response?.data;
  }, []);

  const { data: tasks, loading: tasksLoading } =
    useFetch<countTasksType>(countTasks);
  const { data: users, loading: usersLoading } =
    useFetch<countUsersType>(countUsers);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { loginData } = authContext;

  return (
    <div className="row w-100 gap-3  pt-3  mx-auto">
      {(tasksLoading || usersLoading) && (
        <div className="d-flex mx-auto w-100 justify-content-center  pt-5">
          <div className="spinner-border text-warning " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {/* ****************** tasks stats ******************* */}
      <div className=" col-md-5 ">
        {!tasksLoading && tasks && (
          <div>
            <div className={`${styles["border-container"]} py-3 rounded-3  `}>
              <div className={`${styles["border-element"]}`}></div>
              <div className="pb-3 px-3">
                <h3 className="m-0">Tasks</h3>
                <span className="">
                  Lorem ipsum dolor sit amet,consecteture
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3 pb-3 px-3">
                <StatsCard
                  icon={<ProgressIcon />}
                  title="Progress"
                  color="#e5e6f4"
                  data={tasks!.inProgress}
                />
                <StatsCard
                  icon={<TaskNumberIcon />}
                  title="Tasks Number"
                  data={tasks!.toDo}
                  color="#F4F4E5"
                />
                <StatsCard
                  icon={<ProjectNumberIcon />}
                  title="Projects Number"
                  data={tasks!.done}
                  color="#F4E5ED"
                />
              </div>
            </div>
            <div className={` ${styles["doughnut-chart"]} pt-3`}>
              <DoughnutChart
                label={["Progress", "Tasks", "Projects"]}
                values={[tasks!.inProgress, tasks!.toDo, tasks!.done]}
              />
            </div>
          </div>
        )}
      </div>

      {/* **************** Users Stats ***************** */}
      {loginData?.userGroup === "Manager" && (
        <div className=" col-md-6 ">
          {!usersLoading && users && (
            <div>
              <div
                className={`${styles["border-container"]}  py-3 rounded-3  `}
              >
                <div className={`${styles["border-element"]}`}></div>
                <div className="pb-3 px-3">
                  <h3>Users</h3>
                  <span>Lorem ipsum dolor sit amet,consecteture</span>
                </div>
                <div className="d-flex flex-wrap gap-3 pb-2 px-3">
                  <StatsCard
                    icon={<ProgressIcon />}
                    title="active"
                    color="#e5e6f4"
                    data={users!.activatedEmployeeCount}
                  />
                  <StatsCard
                    icon={<TaskNumberIcon />}
                    title="inactive"
                    data={users!.deactivatedEmployeeCount}
                    color="#F4F4E5"
                  />
                </div>
              </div>
              <div className={` ${styles["doughnut-chart"]} pt-2 pb-5`}>
                <DoughnutChart
                  label={["active", "inactive"]}
                  values={[
                    users!.activatedEmployeeCount,
                    users!.deactivatedEmployeeCount,
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsSection;
