import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/PhotosToursPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import secNavStyles from "../../styles/SecondaryNav.module.css";
import { Container, Form } from "react-bootstrap";
import SecondaryNav from "../../components/SecondaryNav";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PhotosPage({ message, filter = "" }) {
    const [photos, setPhotos] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/photos/?${filter}search=${query}`
                );
                setPhotos(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPhotos();
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
                <div className={secNavStyles.SmallSecondaryNav}>
                    <SecondaryNav mobile />
                </div>
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
                        placeholder="Search photos"
                    />
                </Form>

                {hasLoaded ? (
                    <>
                        {photos.results.length ? (
                            <InfiniteScroll
                                children={photos.results.map((photo) => (
                                    <Photo
                                        key={photo.id}
                                        {...photo}
                                        setPhotos={setPhotos}
                                    />
                                ))}
                                dataLength={photos.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!photos.next}
                                next={() => fetchMoreData(photos, setPhotos)}
                            />
                        ) : (
                            <Container fluid className={appStyles.Content}>
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

export default PhotosPage;
