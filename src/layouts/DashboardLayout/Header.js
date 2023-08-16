import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UserLogo from "../../assert/Image/Ellipse 45.png";
import notificationLogo from "../../assert/Image/Notification.png";
import { useSelector } from "react-redux";

export const Header = ({ hide }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { profile } = useSelector((state) => state?.auth);

  return (
    <>
      <div className="content px-0">
        <Navbar
          expand="lg"
          className="d-flex align-items-center"
          style={{ height: "100px" }}
        >
          <Container>
            <Navbar.Toggle
              aria-controls="sidenav"
              className="me-4"
              onClick={() => hide()}
            />

            <div>
              <h1 className="history-head">Book Store</h1>
            </div>

            <div className="ms-auto">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="notification mb-3">
                  <img
                    src={notificationLogo}
                    alt="notificationLogo"
                    className="img-fluid"
                  />
                </div>
                <div>
                  <img
                    src={UserLogo}
                    alt="UserLogo"
                    className="img-fluid"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={handleShow}
                  />
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header
                    closeButton
                    className="border-bottom-0"
                  ></Modal.Header>
                  <Modal.Body>
                    <p className="mb-0">User : {profile?.name}</p>
                    <p>Email : {profile?.email}</p>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
