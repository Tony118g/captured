import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PhotoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

function PhotoCreateForm() {
    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    placeholder="Give this photo a title"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Camera used</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="What camera did you use? (optional)."
                    name="camera"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Lense used</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="What lense did you use? (optional)."
                    name="lense"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Share more information about this photo (optional)."
                    name="description"
                />
            </Form.Group>

            <Button className={`${btnStyles.Button} mr-3`} onClick={() => {}}>
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
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 mt-4">
                    <Container className={appStyles.Content}>{textFields}</Container>
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
                                <Asset message="Click or tap to upload a photo"/>
                            </Form.Label>
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PhotoCreateForm;
