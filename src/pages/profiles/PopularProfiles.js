import React from 'react';
import { Container } from 'react-bootstrap';
import appStyles from '../../App.module.css';
import styles from '../../styles/PopularProfiles.module.css';
import Asset from '../../components/Asset';
import PopularProfileLink from './PopularProfileLink';
import { useProfileData } from '../../contexts/ProfileDataContext';

/**
 * Retrieves Profiles from API and displays
 * the most followed
 * (10 for large screens and 4 for small screens).
 */
function PopularProfiles({ mobile }) {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      fluid
      className={`${appStyles.Content} mt-2 ${
        mobile
          ? `${styles.SmallPopProfContainer} text-center`
          : styles.ScrollContainer
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <h5 className={`${styles.Heading} ${mobile ? 'mb-1' : undefined}`}>
            Popular profiles
          </h5>
          {mobile ? (
            <div className="d-flex justify-content-around my-0">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <PopularProfileLink key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results
              .slice(0, 10)
              .map((profile) => (
                <PopularProfileLink key={profile.id} profile={profile} />
              ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default PopularProfiles;
