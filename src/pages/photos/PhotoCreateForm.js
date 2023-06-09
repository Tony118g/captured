/* eslint-disable */
import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Image, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/TourPhotoCreateEditForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import Asset from '../../components/Asset';
import { axiosReq } from '../../api/axiosDefaults';
import SecondaryNav from '../../components/SecondaryNav';
import useRedirect from '../../hooks/useRedirect';

/**
 * Renders the photo creation form and supplies
 * the user with input fields to create a photo post.
 */
function PhotoCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [photoData, setPhotoData] = useState({
    title: '',
    camera_used: '',
    lense_used: '',
    description: '',
    image: '',
  });

  const {
    title,
    camera_used,
    lense_used,
    description,
    image,
  } = photoData;

  const imageInput = useRef(null);
  const history = useHistory();

  /**
   * Converts inputed data into Key: Value pairs.
   */
  const handleChange = (event) => {
    setPhotoData({
      ...photoData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handles changing of uploaded image and
   * clears any previously uploaded image.
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPhotoData({
        ...photoData,
        image: URL.createObjectURL(event.target.files[0]),
      });
      setErrors((prevState) => ({
        ...prevState,
        image: [],
      }));
    }
  };

  /**
   * Pushes data to the API, displays error messages
   * for invalid data if any and sets
   * a feedback message to be shown to the user
   * for successful creation.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('camera_used', camera_used);
    formData.append('lense_used', lense_used);
    formData.append('description', description);
    formData.append('image', imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post('/photos/', formData);
      history.push({
        pathname: `/photos/${data.id}`,
        state: {
          showFeedback: true,
          message: 'Your photo has been successfully posted.',
        },
      });
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        if (!image.length) {
          setErrors((prevState) => ({
            ...prevState,
            image: ['An image is required.'],
          }));
        }
      }
    }
  };

  // The text input fields for the form.
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.camera_used?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.lense_used?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
        create
      </Button>
    </div>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 mt-4">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="p-0 p-md-2 my-4" md={7} lg={6}>
            <Container
              className={` ${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
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
                    <i className="fa-solid fa-cloud-arrow-up" />
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
      <SecondaryNav mobile />
    </>
  );
}

export default PhotoCreateForm;
