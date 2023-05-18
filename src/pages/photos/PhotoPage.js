import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

function PhotoPage() {
    // Add your logic here

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" md={4}>
                <p>Post a photo, Feed, Liked photos, Tours</p>
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for mobile</p>
                <p>Post component</p>
                <Container className={appStyles.Content}>Comments</Container>
            </Col>
        </Row>
    );
}

export default PhotoPage;
