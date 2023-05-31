import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Tour from "./Tour";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PhotosToursPage.module.css";
import { Container, Form } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import PopularProfiles from "../profiles/PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ToursPage({ message, filter = "" }) {
    const [tours, setTours] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/tours/?${filter}search=${query}`
                );
                setTours(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchTours();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2" md={4}>
                <div className={appStyles.FixedContainer}>
                    <SideNav />
                    <PopularProfiles />
                </div>
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <SideNav mobile />
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
                {hasLoaded ? (
                    <>
                        {tours.results.length ? (
                            <InfiniteScroll
                                children={tours.results.map((tour) => (
                                    <Tour
                                        key={tour.id}
                                        {...tour}
                                        setTours={setTours}
                                    />
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
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default ToursPage;
