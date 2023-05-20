import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Media } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    <p className="mb-0 mt-2">{content}</p>
                </Media.Body>
                {is_owner && (
                    <EditDeleteDropdown handleEdit={() => {}} handleDelete={() => {}}/>
                )}
            </Media>
        </div>
    );
};

export default Comment;
