import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const SideNav = ({ mobile }) => {
    const currentUser = useCurrentUser();

    return (
        <Container fluid
            className={`${appStyles.Content} mt-2 ${
                mobile && "d-lg-none text-center mt-3"
            }`}
        >
            {currentUser?.is_admin_user && (
                <Link
                    to="/tours/create"
                    className={mobile ? "col-3" : "d-block pt-2"}
                >
                    <i className="fa-regular fa-plus"></i>
                    <p className={mobile ? "d-none" : "d-inline"}>Add a tour</p>
                </Link>
            )}
            <Link
                to="/photos/create"
                className={mobile ? "col-3" : "d-block pt-2"}
            >
                <i className="fa-regular fa-plus"></i>
                <p className={mobile ? "d-none" : "d-inline"}>Post photo</p>
            </Link>
            <Link to="/liked" className={mobile ? "col-3" : "d-block pt-2"}>
                <i className="fa-solid fa-heart"></i>
                <p className={mobile ? "d-none" : "d-inline"}>Liked photos</p>
            </Link>
            <Link to="/feed" className={mobile ? "col-3" : "d-block pt-2"}>
                <i className="fa-solid fa-rss"></i>
                <p className={mobile ? "d-none" : "d-inline"}>Feed</p>
            </Link>
            <Link to="/tours" className={mobile ? "col-3" : "d-block pt-2"}>
                <i className="fa-solid fa-camera-retro"></i>
                <p className={mobile ? "d-none" : "d-inline"}>Tours</p>
            </Link>
        </Container>
    );
};

export default SideNav;
