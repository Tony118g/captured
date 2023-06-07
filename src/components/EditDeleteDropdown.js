import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/EditDeleteDropdown.module.css";
import { useHistory } from "react-router";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

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

export const EditDeleteDropdown = (props) => {
    const { handleEdit, handleDelete, keyWord, editable } = props;

    return (
        <>
            <Dropdown className="ml-auto" drop="left">
                <Dropdown.Toggle as={ThreeDots} />

                <Dropdown.Menu
                    className={`${styles.DropdownMenu} text-center`}
                    popperConfig={{ strategy: "fixed" }}
                >
                    {!editable ? (
                        <OverlayTrigger
                            placement="left"
                            overlay={
                                keyWord === "tour" ? (
                                    <Popover>
                                        <Popover.Title className="bg-info">
                                            Cannot edit tours that have passed
                                        </Popover.Title>
                                        <Popover.Content
                                            className={styles.PopoverContent}
                                        >
                                            This tour cannot be edited because
                                            it has already passed. If you would
                                            like to replace it with one that has
                                            new dates, you can delete this one
                                            and create a new one.
                                        </Popover.Content>
                                    </Popover>
                                ) : (
                                    <Tooltip>This cannot be edited.</Tooltip>
                                )
                            }
                        >
                            <span>
                                <Dropdown.Item
                                    className={styles.Disabled}
                                    onClick={handleEdit}
                                    aria-label="edit"
                                >
                                    <i className="fas fa-edit" />
                                </Dropdown.Item>
                            </span>
                        </OverlayTrigger>
                    ) : (
                        <Dropdown.Item onClick={handleEdit} aria-label="edit">
                            <i className="fas fa-edit" />
                        </Dropdown.Item>
                    )}

                    <ConfirmDeleteModal
                        handleDelete={handleDelete}
                        keyWord={keyWord}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export function ProfileEditDropdown({ id }) {
    const history = useHistory();

    return (
        <Dropdown className={`ml-auto px-3 ${styles.PushRight}`}>
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fa-solid fa-user-pen"></i> edit profile
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/username`)
                    }
                    aria-label="edit-username"
                >
                    <i className="fa-solid fa-id-card"></i>
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() =>
                        history.push(`/profiles/${id}/edit/password`)
                    }
                    aria-label="edit-password"
                >
                    <i className="fa-solid fa-key"></i>
                    change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
