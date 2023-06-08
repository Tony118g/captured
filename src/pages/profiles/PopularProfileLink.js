/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../styles/PopularProfileLink.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

function PopularProfileLink(props) {
  const { profile, mobile, imageSize = 50 } = props;
  const {
    id,
    following_id,
    image,
    owner,
  } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={mobile ? 'flex-column my-0' : 'my-3 d-flex align-items-center'}
    >
      <div>
        <Link
          to={`/profiles/${id}`}
          className={`"align-items-center" ${
            mobile ? 'flex-column' : undefined
          }`}
        >
          <Avatar src={image} height={mobile ? 30 : imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.Username}`}>
        <Link to={`/profiles/${id}`}>{owner}</Link>
      </div>
      <div
        className={`text-right ${styles.FollowBtn} ${
          !mobile ? 'ml-auto' : undefined
        }`}
      >
        {!mobile && currentUser && !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.UnfollowBtn} p-1`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} p-1`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
}

export default PopularProfileLink;
