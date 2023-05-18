import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PhotoPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: photo }] = await Promise.all([
                    axiosReq.get(`/photos/${id}`),
                ]);
                setPhoto({ results: [photo] });
                console.log(photo);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" md={4}>
                <p>Post a photo, Feed, Liked photos, Tours</p>
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for mobile</p>
                <p>Photo post component</p>
                <Container className={appStyles.Content}>Comments</Container>
            </Col>
        </Row>
    );
}

export default PhotoPage;
