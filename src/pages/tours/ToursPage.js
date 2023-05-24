import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ToursPage({ message, filter = "" }) {

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2" md={4}>
                <p>Post a photo, Feed, Liked photos, Tours</p>
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <p>Post a photo, Feed, Liked photos, Tours for mobile </p>
                <p>Popular profiles for mobile</p>
                <p>List of tours goes here</p>
            </Col>
        </Row>
    );
}

export default ToursPage;
