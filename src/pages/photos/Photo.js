import React from "react";
import styles from "../../styles/Photo.module.css";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

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

    const handleLike = async () => {
        try {
          const { data } = await axiosRes.post("/likes/", { photo: id });
          setPhotos((prevPhotos) => ({
            ...prevPhotos,
            results: prevPhotos.results.map((photo) => {
              return photo.id === id
                ? { ...photo, likes_count: photo.likes_count + 1, like_id: data.id }
                : photo;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <Card>
            <Card.Body className={styles.Title}>
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
                {camera_used && (
                    <Card.Text>Camera used: {camera_used}</Card.Text>
                )}
                {lense_used && <Card.Text>Lense used: {lense_used}</Card.Text>}
                {description && <Card.Text>{description}</Card.Text>}

                <div className={`float-right mr-3 ${styles.Icons}`}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>You can't like your own post!</Tooltip>
                            }
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={""}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i
                                className={`far fa-heart ${styles.HeartOutline}`}
                            />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/photos/${id}`}>
                        <i className={`far fa-comments  ${styles.CommentBubble}`} />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Photo;
