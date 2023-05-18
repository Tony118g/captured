import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PhotoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PhotoCreateForm() {
    
    const [photoData, setPhotoData] = useState({
        title: "",
        camera_used: "",
        lense_used: "",
        description: "",
        image: "",
    });

    const { title, camera_used, lense_used, description, image } = photoData;

    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPhotoData({
            ...photoData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPhotoData({
                ...photoData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("camera_used", camera_used);
        formData.append("lense_used", lense_used);
        formData.append("description", description);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/photos/", formData);
            history.push(`/photos/${data.id}`);
        } catch (err) {
            console.log(err);
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Give this photo a title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Camera used</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="What camera did you use? (optional)."
                    name="camera_used"
                    value={camera_used}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Lense used</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="What lense did you use? (optional)."
                    name="lense_used"
                    value={lense_used}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Share more information about this photo (optional)."
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button className={`${btnStyles.Button} mr-3`} onClick={() => history.goBack()}>
                cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
                create
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
                                            htmlFor="photo-upload"
                                        >
                                            Change the photo
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-block justify-content-center"
                                    htmlFor="photo-upload"
                                >
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                    <Asset message="Click or tap to upload a photo" />
                                </Form.Label>
                            )}

                            <Form.File
                                id="photo-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PhotoCreateForm;
