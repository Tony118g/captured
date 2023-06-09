import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/captured-logo.png';
import styles from '../styles/NavBar.module.css';

import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

/**
 * The main navigation bar used for the site.
 */
function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /**
   * Handles logout of a user, sets the current user to null
   * and removes token time stamp.
   */
  const handleLogOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  // The navlinks used for logged out users.
  const loggedOutNavLinks = (
    <>
      <NavLink
        className={`${styles.NavLink} m-2 m-md-0`}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket" />
        Login
      </NavLink>
      <NavLink
        className={`${styles.NavLink} m-2 m-md-0`}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus" />
        Signup
      </NavLink>
    </>
  );

  // The navlinks used for logged in users.
  const loggedInNavLinks = (
    <>
      <NavLink
        className={`${styles.NavLink} m-2 m-md-0`}
        to="/"
        onClick={handleLogOut}
      >
        <i className="fas fa-sign-out-alt" />
        Log out
      </NavLink>
      <NavLink
        className={`${styles.NavLink} m-2 m-md-0`}
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
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              className={`${styles.NavLink} m-2 m-md-0`}
              activeClassName={styles.Active}
              exact
              to="/"
            >
              <i className="fa-solid fa-house" />
              Home
            </NavLink>
            <NavLink
              className={`${styles.NavLink} m-2 m-md-0`}
              activeClassName={styles.Active}
              to="/about"
            >
              <i className="fa-solid fa-book-open" />
              About
            </NavLink>
            {currentUser ? loggedInNavLinks : loggedOutNavLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
