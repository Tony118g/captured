import React from "react";
import { Card, Media } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Photo = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        camera_used,
        lense_used,
        description,
        image,
        updated_at,
        photoPage,
        setPhotos,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <Card>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && photoPage && "..."}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/photos/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && (
                    <Card.Title className="text-center">{title}</Card.Title>
                )}
                {camera_used && <Card.Text>Camera used: {camera_used}</Card.Text>}
                {lense_used && <Card.Text>Lense used: {lense_used}</Card.Text>}
                {description && <Card.Text>{description}</Card.Text>}
            </Card.Body>
        </Card>
    );
};

export default Photo;
