import { Button, Modal } from "react-bootstrap";
import { ProjectType } from "../../../projects/components/ProjectsList/ProjectsList";
import ProjectTabs from "../ProjectTabs/ProjectTabs";

type ViewDetailsModalProps = {
  toggleShow: boolean;
  handleCloseDetails: () => void;
  data: ProjectType | null;
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
    // <Modal
    //   show={toggleShow}
    //   onHide={handleCloseDetails}
    //   centered
    //   className="px-3 "
    // >
    //   <Modal.Header
    //     closeButton
    //     className="border-0 fw-bold d-flex justify-content-between m-3"
    //   >
    //     <h5 className=" fw-bold">Project Details</h5>
    //     {/* <i
    //       className="fa-regular fa-circle-xmark text-danger fs-4 cursor-pointer "
    //       onClick={handleCloseDetails}
    //     /> */}
    //   </Modal.Header>
    //   <Modal.Body className="d-flex flex-column gap-3 ">
    //     {/* <span className="mx-3">{data?.description}</span> */}
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button
    //       className="btn-outline-dark fw-bold"
    //       variant="white"
    //       onClick={handleCloseDetails}
    //     >
    //       Close
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    <>
      {!loading && (
        // <Modal show={toggleShow} onHide={handleCloseDetails} size="lg">
        //   {" "}
        //   <Modal.Header closeButton>
        //     <Modal.Title>Project Details</Modal.Title>{" "}
        //   </Modal.Header>{" "}
        //   <Modal.Body>
        //     <h3>{data!.title}</h3> <p>{data!.description}</p>{" "}
        //     <p>
        //       <strong>Creation Date:</strong>
        //       {data!.creationDate}
        //     </p>{" "}
        //     <p>
        //       <strong>Modification Date:</strong>
        //       {data!.modificationDate}
        //     </p>{" "}
        //     <h4>Tasks</h4>{" "}
        //     <ul>
        //       {data!.task.map((task) => (
        //         <li key={task.id}>
        //           {" "}
        //           <strong>Title:</strong> {task.title}
        //           <br />
        //           <strong>Description:</strong> {task.description}
        //           <br /> <strong>Status:</strong>
        //           {task.status}
        //           <br /> <strong>Creation Date:</strong> {task.creationDate}
        //           <br />
        //           <strong>Modification Date:</strong> {task.modificationDate}{" "}
        //         </li>
        //       ))}
        //     </ul>{" "}
        //     <h4>Manager</h4>{" "}
        //     <p>
        //       <strong>Name:</strong> {data!.manager.userName}
        //     </p>
        //     <p>
        //       <strong>Email:</strong> {data!.manager!.email}
        //     </p>{" "}
        //     {/* <p>
        //   <strong>Country:</strong>
        //   {data!.manager.country}
        // </p>{" "} */}
        //     <p>
        //       <strong>Phone Number:</strong>
        //       {data!.manager.phoneNumber}
        //     </p>
        //     <img
        //       src={data!.manager.imagePath}
        //       alt="Manager"
        //       className="img-fluid rounded-circle"
        //     />{" "}
        //   </Modal.Body>{" "}
        //   <Modal.Footer>
        //     {" "}
        //     <Button variant="secondary" onClick={handleCloseDetails}>
        //       Close
        //     </Button>
        //   </Modal.Footer>{" "}
        // </Modal>
        <Modal show={toggleShow} onHide={handleCloseDetails} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectTabs project={data} />
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
