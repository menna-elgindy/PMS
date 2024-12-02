import { Button, Modal } from "react-bootstrap";
import ProjectTabs from "../ProjectTabs/ProjectTabs";
import { getProjectTypes } from "../../../../interface/Projects/Projects";

type ViewDetailsModalProps = {
  toggleShow: boolean;
  handleCloseDetails: () => void;
  data: getProjectTypes | null;
  loading: boolean;
};

const ViewDetailsModal = ({
  toggleShow,
  handleCloseDetails,
  data,
  loading,
}: ViewDetailsModalProps) => {
  console.log(data);
  return (
    <>
      {!loading && (
        <Modal show={toggleShow} onHide={handleCloseDetails} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectTabs project={data} loading={loading} />
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
