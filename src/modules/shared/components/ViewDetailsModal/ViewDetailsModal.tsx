import { Button, Modal } from "react-bootstrap";
import { getProjectTypes } from "../../../../interface/Projects/Projects";
import { UsersListResponse } from "../../../../interface/users/ApiResponseForUser";
import { useLocation } from "react-router-dom";
import ViewTabs from "../ViewTabs/ViewTabs";
import { getTaskTypes } from "../../../tasks/components/TasksList/TasksList";
import styles from "./ViewDetailsModal.module.css";

type ViewDetailsModalProps = {
  toggleShow: boolean;
  handleCloseDetails: () => void;
  projectData?: getProjectTypes | null;
  userData?: UsersListResponse | null;
  taskData?: getTaskTypes | null;
  loading: boolean;
};

const ViewDetailsModal = ({
  toggleShow,
  handleCloseDetails,
  projectData,
  userData,
  taskData,
  loading,
}: ViewDetailsModalProps) => {
  const { pathname } = useLocation();
  return (
    <>
      {!loading && (
        <Modal
          show={toggleShow}
          onHide={handleCloseDetails}
          size="lg"
          centered
          className={styles["view-modal"]}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-3">
              {pathname.includes("projects")
                ? "Project "
                : pathname.includes("users")
                ? "User "
                : "Task "}
              Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewTabs
              project={projectData}
              user={userData}
              task={taskData}
              loading={loading}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ViewDetailsModal;
