import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoDataImg from "../../../../assets/images/no-data.svg";
import styles from "./DeleteConfirmation.module.css";

type Props = {
  toggleShow: boolean;
  handleClose: () => void;
  deleteFun: () => void;
  deleteItem: string;
};
const DeleteConfirmation = ({
  toggleShow,
  handleClose,
  deleteFun,
  deleteItem,
}: Props) => {
  return (
    <Modal
      show={toggleShow}
      onHide={handleClose}
      centered
      className={`px-3 ${styles["delete-modal"]} `}
    >
      <Modal.Header closeButton className="border-0 "></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img src={NoDataImg} alt="no data" />
          <h5>Delete This {deleteItem} ?</h5>
          <p>
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn-outline-danger"
          variant="white"
          onClick={deleteFun}
        >
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
