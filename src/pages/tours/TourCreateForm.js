import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/TourPhotoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function TourCreateForm() {
    const [tourData, setTourData] = useState({
        title: "",
        country: "",
        city: "",
        guide: "",
        price: "",
        time_period: "",
        booking_means: "",
        description: "",
    });

    const {
        title,
        country,
        city,
        guide,
        price,
        time_period,
        booking_means,
        description,
    } = tourData;

    const handleChange = (event) => {
        setTourData({
            ...tourData,
            [event.target.name]: event.target.value,
        });
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={country}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Guide</Form.Label>
                        <Form.Control
                            type="text"
                            name="guide"
                            value={guide}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Price (USD)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="0.00"
                            name="price"
                            value={price}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Label>Time period</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g. - may 20th to may 30th"
                    name="time_period"
                    value={time_period}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Means of booking</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="How to book this tour."
                    name="booking_means"
                    value={booking_means}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Share more information about this tour (optional)."
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button
                className={`${btnStyles.CancelBtn} mr-3`}
                onClick={() => {}}
            >
                cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col
                    md={5}
                    lg={6}
                    className="d-none d-md-block p-0 p-md-2 mt-4"
                >
                    <Container className={appStyles.Content}>
                        {textFields}
                    </Container>
                </Col>
                <Col className="py-2 p-0 p-md-2 my-4" md={7} lg={6}>
                    <Container
                        className={` ${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            <Form.Label
                                className="d-block justify-content-center"
                                htmlFor="image-upload"
                            >
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                <Asset message="Click or tap to upload an image" />
                            </Form.Label>
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default TourCreateForm;
