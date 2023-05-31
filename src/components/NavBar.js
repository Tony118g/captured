import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/captured-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleLogOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedOutNavLinks = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/login"
            >
                <i className="fa-solid fa-right-to-bracket"></i>Login
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup"
            >
                <i className="fa-solid fa-user-plus"></i>Signup
            </NavLink>
        </>
    );

    const loggedInNavLinks = (
        <>
            <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
                <i className="fas fa-sign-out-alt"></i>Log out
            </NavLink>
            <NavLink
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar
                    src={currentUser?.profile_image}
                    text={currentUser?.username}
                    height={40}
                />
            </NavLink>
        </>
    );

    return (
        <Navbar
            expanded={expanded}
            className={styles.NavBar}
            expand="md"
            fixed="top"
        >
            <Container fluid>
                <NavLink className={styles.Logo} to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="Captured logo" height="60" />
                    </Navbar.Brand>
                </NavLink>
                <NavLink
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                    to="/photos/create"
                >
                    <i className="far fa-plus-square"></i>Post a photo
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            exact
                            to="/"
                        >
                            <i className="fa-solid fa-house"></i>Home
                        </NavLink>
                        <NavLink
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/about"
                        >
                            <i className="fa-solid fa-book-open"></i>About
                        </NavLink>
                        {currentUser ? loggedInNavLinks : loggedOutNavLinks}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
