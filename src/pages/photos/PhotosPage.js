import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../../styles/PhotosPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { Container, Form } from "react-bootstrap";
import SideNav from "../../components/SideNav";

function PhotosPage({ message, filter = "" }) {
    const [photos, setPhotos] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

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
    }, [filter, query, pathname]);

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2 px-4" md={4}>
                <SideNav />
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <SideNav mobile />
                <p>Popular profiles for mobile</p>
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
                            photos.results.map((photo) => (
                                <Photo
                                    key={photo.id}
                                    {...photo}
                                    setPhotos={setPhotos}
                                />
                            ))
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

export default PhotosPage;
