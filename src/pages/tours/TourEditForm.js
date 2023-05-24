import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/TourPhotoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Image, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function TourEditForm() {
    const [errors, setErrors] = useState({});

    const [tourData, setTourData] = useState({
        title: "",
        country: "",
        city: "",
        guide: "",
        price: "",
        time_period: "",
        booking_means: "",
        description: "",
        image: "",
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
        image,
    } = tourData;

    const imageInput = useRef(null);
    const currentUser = useCurrentUser();

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/tours/${id}/`);
                const {
                    title,
                    country,
                    city,
                    guide,
                    price,
                    time_period,
                    booking_means,
                    description,
                    image,
                } = data;

                currentUser?.is_admin_user
                    ? setTourData({
                          title,
                          country,
                          city,
                          guide,
                          price,
                          time_period,
                          booking_means,
                          description,
                          image,
                      })
                    : history.push("/tours");
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id, currentUser]);

    const handleChange = (event) => {
        setTourData({
            ...tourData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setTourData({
                ...tourData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("guide", guide);
        formData.append("price", price);
        formData.append("time_period", time_period);
        formData.append("booking_means", booking_means);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/tours/${id}/`, formData);
            history.push(`/tours`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
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
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
                        {errors?.country?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                        {errors?.city?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
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
                        {errors?.guide?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
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
                        {errors?.price?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
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
            {errors?.time_period?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
            {errors?.booking_means?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
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
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.CancelBtn} mr-3`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
                edit
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
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
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} btn`}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-block justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default TourEditForm;
