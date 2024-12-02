import { Tab, Tabs } from "react-bootstrap";
import { ProjectType } from "../../../projects/components/ProjectsList/ProjectsList";
import { IMAGE_URL } from "../../../../api";
import styles from "./ProjectTabs.module.css";
interface ProjectTabsProps {
  project: ProjectType | null;
}
const ProjectTabs = ({ project }: ProjectTabsProps) => {
  return (
    <Tabs defaultActiveKey="overview" id="project-tabs" className="mb-3">
      <Tab eventKey="overview" title="Overview">
        <h3>{project!.title}</h3> <p>{project!.description}</p>
        <p>
          <strong>Creation Date:</strong> {project!.creationDate}
        </p>
        <p>
          <strong>Modification Date:</strong> {project!.modificationDate}
        </p>
      </Tab>
      <Tab eventKey="tasks" title="Tasks">
        <h4>Tasks</h4>
        <ul>
          {project!.task.map((task) => (
            <li key={task.id}>
              {" "}
              <strong>Title:</strong> {task.title}
              <br /> <strong>Description:</strong> {task.description}
              <br /> <strong>Status:</strong> {task.status}
              <br /> <strong>Creation Date:</strong> {task.creationDate}
              <br /> <strong>Modification Date:</strong> {task.modificationDate}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </Tab>{" "}
      <Tab eventKey="manager" title="Manager">
        <div className="d-flex p-2 gap-2 ">
          <img
            src={IMAGE_URL + project!.manager!.imagePath}
            alt="Manager"
            className={`img-fluid rounded-circle  ${styles["manager-img"]}`}
          />
          <div className="d-flex flex-column">
            <span> {project!.manager.userName}</span>
            <span className={styles["email"]}>{project!.manager.email}</span>
          </div>
        </div>
        {/* <p>
          <strong>Phone Number:</strong> {project!.manager.phoneNumber}
        </p> */}
      </Tab>
    </Tabs>
  );
};

export default ProjectTabs;
