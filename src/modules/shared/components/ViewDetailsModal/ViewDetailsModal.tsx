import { Button, Modal } from "react-bootstrap";
import ProjectTabs from "../ProjectTabs/ProjectTabs";
import { getProjectTypes } from "../../../../interface/Projects/Projects";
import { UsersListResponse } from "../../../../interface/users/ApiResponseForUser";
import { useLocation } from "react-router-dom";

type ViewDetailsModalProps = {
  toggleShow: boolean;
  handleCloseDetails: () => void;
  projectData?: getProjectTypes | null;
  userData?: UsersListResponse | null;
  loading: boolean;
};

const ViewDetailsModal = ({
  toggleShow,
  handleCloseDetails,
  projectData,
  userData,
  loading,
}: ViewDetailsModalProps) => {
  const { pathname } = useLocation();
  return (
    <>
      {!loading && (
        <Modal show={toggleShow} onHide={handleCloseDetails} size="lg" centered>
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
            <ProjectTabs
              project={projectData}
              user={userData}
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
