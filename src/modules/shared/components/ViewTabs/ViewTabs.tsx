import { Tab, Tabs } from "react-bootstrap";
import { IMAGE_URL } from "../../../../api";
import styles from "./ViewTabs.module.css";
import { getProjectTypes } from "../../../../interface/Projects/Projects";
import { UsersListResponse } from "../../../../interface/users/ApiResponseForUser";
import { useLocation } from "react-router-dom";
import profileImg from "../../../../assets/images/no-profile-picture.jpg";
import { getTaskTypes } from "../../../tasks/components/TasksList/TasksList";

interface ProjectTabsProps {
  project?: getProjectTypes | null;
  user?: UsersListResponse | null;
  task?: getTaskTypes | null;
  loading: boolean;
}
const ViewTabs = ({ project, user, task, loading }: ProjectTabsProps) => {
  const { pathname } = useLocation();
  return (
    <div className={styles["tabs-container"]}>
      {!loading && project && pathname.includes("projects") && (
        <Tabs defaultActiveKey="overview" id="project-tabs" className="mb-3">
          <Tab
            eventKey="overview"
            title="Overview"
            tabClassName={`${styles.customTab}`}
          >
            <p>
              <strong>Name:</strong> {project!.title}
            </p>
            <p>
              <strong>Description:</strong>
              {project!.description}
            </p>
            <p>
              <strong>Creation Date:</strong> {project!.creationDate}
            </p>
          </Tab>
          <Tab
            eventKey="tasks"
            title="Tasks"
            tabClassName={`${styles.customTab}`}
          >
            <div>
              {project!.task.length <= 0 && (
                <p className="fs-5 text-center">No tasks yet</p>
              )}
              {project!.task.map((task) => (
                <div key={task.id} className="pb-3">
                  <div
                    className={`d-flex  justify-content-between align-items-center ${
                      task!.status === "ToDo"
                        ? styles["todo-card"]
                        : task!.status === "Done"
                        ? styles["done-card"]
                        : styles["inprogress-card"]
                    } `}
                  >
                    {task!.title}
                    <span className={`d-flex `}>
                      <i
                        className={`${
                          task!.status === "ToDo"
                            ? "fa fa-pencil-alt"
                            : task!.status === "Done"
                            ? "fa fa-check"
                            : "fa fa-hourglass-half"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              ))}{" "}
            </div>{" "}
          </Tab>{" "}
          <Tab
            eventKey="manager"
            title="Manager"
            tabClassName={`${styles.customTab}`}
          >
            <div className="d-flex p-2 gap-2 ">
              <img
                src={
                  project!.manager!.imagePath
                    ? IMAGE_URL + project!.manager!.imagePath
                    : profileImg
                }
                alt="Manager"
                className={`img-fluid rounded-circle  ${styles["manager-img"]}`}
              />
              <div className="d-flex flex-column">
                <span> {project!.manager.userName}</span>
                <span className={styles["email"]}>
                  {project!.manager.email}
                </span>
              </div>
            </div>
          </Tab>
        </Tabs>
      )}
      {!loading && user && pathname.includes("users") && (
        <Tabs defaultActiveKey="overview" id="users-tabs" className="mb-3">
          <Tab
            eventKey="overview"
            title="Overview"
            tabClassName={styles.customTab}
          >
            <div className="d-flex p-2 gap-2 ">
              <img
                src={user!.imagePath ? IMAGE_URL + user!.imagePath : profileImg}
                alt="Manager"
                className={`img-fluid rounded-circle  ${styles["manager-img"]}`}
              />
              <div className="d-flex flex-column">
                <span> {user!.userName}</span>
                <span className={styles["email"]}>{user!.email}</span>
                <span>{user!.isActivated}</span>
              </div>
            </div>
          </Tab>
        </Tabs>
      )}
      {!loading && task && pathname.includes("tasks") && (
        <Tabs defaultActiveKey="overview" id="project-tabs" className="mb-3">
          <Tab
            eventKey="overview"
            title="Overview"
            tabClassName={`${styles.customTab}`}
          >
            <p>
              <strong>Name:</strong> {task!.title}
            </p>
            <p>
              <strong>Description:</strong>
              {task!.description}
            </p>
            <p>
              <strong>Creation Date:</strong> {task!.creationDate}
            </p>
          </Tab>
          <Tab
            eventKey="project"
            title="Project"
            tabClassName={`${styles.customTab}`}
          >
            <span>{task.project.title}</span>
          </Tab>
          <Tab
            eventKey="employee"
            title="Employee"
            tabClassName={`${styles.customTab}`}
          >
            <div className="d-flex p-2 gap-2 ">
              <img
                src={
                  task.employee!.imagePath
                    ? IMAGE_URL + task.employee!.imagePath
                    : profileImg
                }
                alt="Manager"
                className={`img-fluid rounded-circle  ${styles["manager-img"]}`}
              />
              <div className="d-flex flex-column">
                <span> {task!.employee.userName}</span>
                <span className={styles["email"]}>{task!.employee.email}</span>
              </div>
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default ViewTabs;
