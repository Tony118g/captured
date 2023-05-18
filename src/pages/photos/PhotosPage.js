import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo";

function PhotosPage({ message, filter = "" }) {
    const [photos, setPhotos] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const { data } = await axiosReq.get(
                    `/photos/?${filter}`
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
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2" md={4}>
                <p>Post a photo, Feed, Liked photos, Tours</p>
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <p>Post a photo, Feed, Liked photos, Tours for mobile </p>
                <p>Popular profiles for mobile</p>
                {hasLoaded ? (
                    <>
                    {photos.results.length ? (
                        photos.results.map(photo => (
                            <Photo key={photo.id} {...photo} setPhotos={setPhotos} />
                        ))
                    ) : (
                        console.log("show no results message")
                    )}
                    </>
                ) : (
                    console.log("show loading spinner")
                )}
            </Col>
        </Row>
    );
}

export default PhotosPage;
