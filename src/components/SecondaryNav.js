import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import appStyles from "../App.module.css";
import styles from "../styles/SecondaryNav.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const SecondaryNav = ({ mobile }) => {
    const currentUser = useCurrentUser();

    return (
        <Nav className={`p-0 ${mobile &&  styles.SmallSecondaryNav}`}>
            <Container
                fluid
                className={`${appStyles.Content} mt-2 ${
                    mobile && "text-center d-flex justify-content-around"
                }`}
            >
                {currentUser && (
                    <>
                        {currentUser?.is_admin_user && (
                            <Link
                                to="/tours/create"
                                className={!mobile && "d-block pt-2"}
                            >
                                <i className="fa-regular fa-plus"></i>
                                <p className={!mobile && "d-inline"}>
                                    Add tour
                                </p>
                            </Link>
                        )}
                        <Link
                            to="/photos/create"
                            className={!mobile && "d-block pt-2"}
                        >
                            <i className="fa-regular fa-plus"></i>
                            <p className={!mobile && "d-inline"}>Post photo</p>
                        </Link>
                        <Link to="/liked" className={!mobile && "d-block pt-2"}>
                            <i className="fa-solid fa-heart"></i>
                            <p className={!mobile && "d-inline"}>
                                Liked photos
                            </p>
                        </Link>
                        <Link to="/feed" className={!mobile && "d-block pt-2"}>
                            <i className="fa-solid fa-rss"></i>
                            <p className={!mobile && "d-inline"}>Feed</p>
                        </Link>
                    </>
                )}
                <Link to="/tours" className={!mobile && "d-block pt-2"}>
                    <i className="fa-solid fa-camera-retro"></i>
                    <p className={!mobile && "d-inline"}>Tours</p>
                </Link>
                {mobile && (
                    <Link to="/" className={!mobile && "d-block pt-2"}>
                        <i className="fa-solid fa-house"></i>
                        <p className={!mobile && "d-inline"}>Home</p>
                    </Link>
                )}
            </Container>
        </Nav>
    );
};

export default SecondaryNav;
