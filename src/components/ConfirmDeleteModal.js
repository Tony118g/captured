import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";

const ConfirmDeleteModal = ({keyWord, handleDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeThenDelete = () => {
        setShow(false);
        handleDelete();
    };

    return (
        <>
            <Dropdown.Item onClick={handleShow} aria-label="delete">
                <i className="fas fa-trash-alt" />
                {keyWord !== "account" ? ("") : ("Delete account")}
            </Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this {keyWord}? This cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className={btnStyles.CancelBtn}
                        onClick={handleClose}
                    >
                        cancel
                    </Button>
                    <Button className={btnStyles.Button} onClick={closeThenDelete}>
                        delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmDeleteModal;
