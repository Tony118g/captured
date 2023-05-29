import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Media } from "react-bootstrap";

const AttendeeProfileLink = (props) => {
    const { profile_id, profile_image, owner } = props;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <Link to={`/profiles/${profile_id}`}>
                        <span>{owner}</span>
                    </Link>
                </Media.Body>
            </Media>
        </div>
    );
};

export default AttendeeProfileLink;


