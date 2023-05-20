import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Media } from "react-bootstrap";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body>
                    <span>{owner}</span>
                    <span>{updated_at}</span>
                    <p>{content}</p>
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;
