/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import InfiniteScroll from 'react-infinite-scroll-component';
import Asset from '../../components/Asset';
import styles from '../../styles/ProfilePage.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import PopularProfiles from './PopularProfiles';
import SecondaryNav from '../../components/SecondaryNav';
import {
  useProfileData,
  useSetProfileData,
} from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import Photo from '../photos/Photo';
import { fetchMoreData } from '../../utils/utils';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { ProfileEditDropdown } from '../../components/EditDeleteDropdown';
import FeedbackAlert from '../../components/FeedbackAlert';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePhotos, setProfilePhotos] = useState({ results: [] });
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePhotos }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/photos/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));

        setProfilePhotos(profilePhotos);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {location.state?.showFeedback && (
        <FeedbackAlert variant="info" message={location.state?.message} />
      )}
      {profile?.is_owner && (
        <ProfileEditDropdown
          id={profile?.id}
          className="justify-content-right"
          keyWord="account"
        />
      )}
      <Row noGutters className="px-3 text-center">
        <Col className={`${appStyles.ContentColumn}`}>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col className={appStyles.ContentColumn}>
          <h3 className={`${styles.ProfileNameHeading} m-2 text-center`}>
            {profile?.owner}
          </h3>
          <Row
            className={`${styles.StatsContainer} no-gutters justify-content-center`}
          >
            <Col xs={3} className="m-2">
              <div>{profile?.photos_count}</div>
              <div>photos</div>
            </Col>
            <Col xs={3} className="m-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="m-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col className={`${appStyles.ContentColumn} pt-2`}>
          {currentUser && !is_owner &&
            (profile?.following_id ? (
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
        </Col>
        {profile?.description && (
          <div className="pt-3 pb-1 mx-auto w-100">{profile.description}</div>
        )}
      </Row>
    </>
  );

  const mainProfilePostedPhotos = (
    <>
      <hr />
      {profilePhotos.results.length ? (
        <InfiniteScroll
          children={profilePhotos.results.map((photo) => (
            <Photo key={photo.id} {...photo} setPhotos={setProfilePhotos} />
          ))}
          dataLength={profilePhotos.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePhotos.next}
          next={() => fetchMoreData(profilePhotos, setProfilePhotos)}
        />
      ) : (
        <Asset
          message={`No results found, ${profile?.owner} does not have any posted photos.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="p-2" md={4}>
        <div className={appStyles.FixedContainer}>
          <SecondaryNav />
          <PopularProfiles />
        </div>
      </Col>
      <Col md={8} className={`${appStyles.ContentColumn} p-2`}>
        <SecondaryNav mobile />
        <PopularProfiles mobile />
        <Container fluid className={`${appStyles.Content} mt-2`}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePostedPhotos}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
