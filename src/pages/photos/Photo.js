/* eslint-disable */
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import styles from '../../styles/Photo.module.css';
import appStyles from '../../App.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import FeedbackAlert from '../../components/FeedbackAlert';

/**
 * The display for a photo.
 */
function Photo(props) {
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
  const history = useHistory();
  const [showFeedback, setShowFeedback] = useState(false);

  /**
   * Directs user to the relevant photo edit page .
   */
  const handleEdit = () => {
    history.push(`/photos/${id}/edit`);
  };

  /**
   * Deletes the photo from the API and sets
   * a feedback message to be shown to the user.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/photos/${id}/`);
      setShowFeedback(true);
      setTimeout(() => {
        history.push('/');
      }, 3000);
    } catch (err) {
      // console.log(err);
    }
  };

  /**
   * Handles liking of a photo by
   * sending a request to the API for
   * a photo with a specific id and
   * incrementing the likes count by 1.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { photo: id });
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id
            ? { ...photo, likes_count: photo.likes_count + 1, like_id: data.id }
            : photo;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  /**
   * Handles unliking of a photo by
   * sending a request to the API for
   * a photo with a specific id and
   * decreasing the likes count by 1.
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        results: prevPhotos.results.map((photo) => {
          return photo.id === id
            ? { ...photo, likes_count: photo.likes_count - 1, like_id: null }
            : photo;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      {showFeedback && (
        <FeedbackAlert
          variant="info"
          message="This photo has been deleted. Returning to home page..."
        />
      )}
      <Card className="mt-2">
        <Card.Body className={`${appStyles.CardTop} ${styles.CardTitle}`}>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={45} text={owner} />
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && photoPage && (
                <EditDeleteDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  keyWord="photo"
                  editable
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/photos/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && (
            <Card.Title className={`${styles.Title} text-center`}>
              {title}
            </Card.Title>
          )}
          {camera_used && (
            <Card.Text className="mb-0">
              Camera used:
              <span className={appStyles.InfoText}>{camera_used}</span>
            </Card.Text>
          )}
          {lense_used && (
            <Card.Text className="mb-0">
              Lense used:
              <span className={appStyles.InfoText}>{lense_used}</span>
            </Card.Text>
          )}
          <hr className="m-1" />
          {description && (
            <Card.Text className="mb-0 py-1">{description}</Card.Text>
          )}

          <div className={`float-right mr-3 ${styles.Icons}`}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You cannot like your own post!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike} role="presentation">
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike} role="presentation">
                <i className={`far fa-heart ${styles.HeartOutline}`} />
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
    </>
  );
}

export default Photo;
