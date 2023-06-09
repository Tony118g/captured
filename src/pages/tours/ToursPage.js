/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Tour from './Tour';
import Asset from '../../components/Asset';
import appStyles from '../../App.module.css';
import styles from '../../styles/PhotosToursPage.module.css';
import SecondaryNav from '../../components/SecondaryNav';
import PopularProfiles from '../profiles/PopularProfiles';
import { fetchMoreData } from '../../utils/utils';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import FeedbackAlert from '../../components/FeedbackAlert';

/**
 * The display for all posted tours
 * related to the filter prop.
 */
function ToursPage({ message, filter = '' }) {
  const [tours, setTours] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const currentUser = useCurrentUser();
  const location = useLocation();

  /**
   * Fetches tours from the API relevant to the filter.
   */
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await axiosReq.get(`/tours/?${filter}search=${query}`);
        setTours(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    // Delays API requests by 1 second when search query is input.
    const timer = setTimeout(() => {
      fetchTours();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

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
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search tours"
          />
        </Form>
        {location.state?.showFeedback && (
          <FeedbackAlert variant="info" message={location.state?.message} />
        )}
        {hasLoaded ? (
          <>
            {tours.results.length ? (
              <InfiniteScroll
                children={tours.results.map((tour) => (
                  <Tour key={tour.id} {...tour} setTours={setTours} />
                ))}
                dataLength={tours.results.length}
                loader={<Asset spinner />}
                hasMore={!!tours.next}
                next={() => fetchMoreData(tours, setTours)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container fluid className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default ToursPage;
