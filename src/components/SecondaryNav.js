import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import appStyles from '../App.module.css';
import styles from '../styles/SecondaryNav.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';

/**
 * The secondary navigation bar.
 */
function SecondaryNav({ mobile }) {
  const currentUser = useCurrentUser();

  return (
    <Nav className={`p-0 ${mobile ? styles.SmallSecondaryNav : undefined}`}>
      <Container
        fluid
        className={`${appStyles.Content} mt-2 ${
          mobile ? 'text-center d-flex justify-content-around' : undefined
        }`}
      >
        {currentUser && (
          <>
            {currentUser?.is_admin_user && (
              <Link
                to="/tours/create"
                className={!mobile ? 'd-block pt-2' : undefined}
              >
                <i className="fa-regular fa-plus" />
                <p className={!mobile ? 'd-inline' : undefined}>Add tour</p>
              </Link>
            )}
            <Link
              to="/photos/create"
              className={!mobile ? 'd-block pt-2' : undefined}
            >
              <i className="fa-regular fa-plus" />
              <p className={!mobile ? 'd-inline' : undefined}>Post photo</p>
            </Link>
            <Link to="/liked" className={!mobile ? 'd-block pt-2' : undefined}>
              <i className="fa-solid fa-heart" />
              <p className={!mobile ? 'd-inline' : undefined}>Liked photos</p>
            </Link>
            <Link to="/feed" className={!mobile ? 'd-block pt-2' : undefined}>
              <i className="fa-solid fa-rss" />
              <p className={!mobile ? 'd-inline' : undefined}>Feed</p>
            </Link>
          </>
        )}
        <Link to="/tours" className={!mobile ? 'd-block pt-2' : undefined}>
          <i className="fa-solid fa-camera-retro" />
          <p className={!mobile ? 'd-inline' : undefined}>Tours</p>
        </Link>
        {mobile && (
          <Link to="/" className={!mobile ? 'd-block pt-2' : undefined}>
            <i className="fa-solid fa-house" />
            <p className={!mobile ? 'd-inline' : undefined}>Home</p>
          </Link>
        )}
      </Container>
    </Nav>
  );
}

export default SecondaryNav;
