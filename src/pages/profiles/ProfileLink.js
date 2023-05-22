import React from "react";
import styles from "../../styles/ProfileLink.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";

const ProfileLink = (props) => {
    const { profile, mobile, imageSize = 50 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div
            className={`my-3 d-flex align-items-center ${
                mobile && "flex-column"
            }`}
        >
            <div>
                <Link
                    to={`/profiles/${id}`}
                    className={`"align-items-center" ${
                        mobile && "flex-column"
                    }`}
                >
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong className={styles.Username}>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={`${btnStyles.UnfollowBtn} p-1`}
                            onClick={() => {}}
                        >
                            unfollow
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.Button} p-1`}
                            onClick={() => {}}
                        >
                            follow
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default ProfileLink;
