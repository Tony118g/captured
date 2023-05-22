import React from "react";
import styles from "../../styles/ProfileLink.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const ProfileLink = (props) => {
    const { profile, mobile, imageSize = 50 } = props;
    const { image, owner } = profile;

    return (
        <div
            className={`my-3 d-flex align-items-center ${
                mobile && "flex-column"
            }`}
        >
            <div>
                <Link
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
        </div>
    );
};

export default ProfileLink;
