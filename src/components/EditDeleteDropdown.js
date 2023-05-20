import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDeleteDropdown.module.css";
import btnStyles from "../styles/Button.module.css";
import { Button, Modal } from "react-bootstrap";

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fas fa-ellipsis-v"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const EditDeleteDropdown = ({ handleEdit, handleDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Dropdown className="ml-auto" drop="left">
                <Dropdown.Toggle as={ThreeDots} />

                <Dropdown.Menu
                    className={`${styles.DropdownMenu} text-center`}
                    popperConfig={{ strategy: "fixed" }}
                >
                    <Dropdown.Item
                        className={styles.DropdownItem}
                        onClick={handleEdit}
                        aria-label="edit"
                    >
                        <i className="fas fa-edit" />
                    </Dropdown.Item>
                    <Dropdown.Item
                        className={styles.DropdownItem}
                        onClick={handleShow}
                        aria-label="delete"
                    >
                        <i className="fas fa-trash-alt" />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button className={btnStyles.CancelBtn} onClick={handleClose}>
                        cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
