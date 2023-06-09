/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Comment.module.css';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import CommentEditForm from './CommentEditForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import FeedbackAlert from '../../components/FeedbackAlert';

function Comment(props) {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPhoto,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPhoto((prevPhoto) => ({
        results: [
          {
            ...prevPhoto.results[0],
            comments_count: prevPhoto.results[0].comments_count - 1,
          },
        ],
      }));
      setShowFeedback(true);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      {showFeedback ? (
        <FeedbackAlert variant="info" message="Comment has been deleted." />
      ) : (
        <div>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              {showEditForm ? (
                <CommentEditForm
                  id={id}
                  profile_id={profile_id}
                  content={content}
                  profileImage={profile_image}
                  setComments={setComments}
                  setShowEditForm={setShowEditForm}
                />
              ) : (
                <p>{content}</p>
              )}
            </Media.Body>
            {is_owner && !showEditForm && (
              <EditDeleteDropdown
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
                keyWord="comment"
                editable
              />
            )}
          </Media>
        </div>
      )}
    </>
  );
}

export default Comment;
