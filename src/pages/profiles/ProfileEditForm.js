/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import SecondaryNav from '../../components/SecondaryNav';

/**
 * Renders the profile details editing form.
 */
function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const { name, description, image } = profileData;

  const [errors, setErrors] = useState({});

  /**
   * Populates form fields with any current data.
   */
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, description, image } = data;
          setProfileData({ name, description, image });
        } catch (err) {
          // console.log(err);
          history.push('/');
        }
      } else {
        history.push('/');
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  /**
   * Converts inputed data into Key: Value pairs.
   */
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Pushes data to the API, displays error messages
   * for invalid data if any and sets
   * a feedback message to be shown to the user
   * for successful edit.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    if (imageFile?.current?.files[0]) {
      formData.append('image', imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.push({
        pathname: `/profiles/${currentUser?.profile_id}`,
        state: {
          showFeedback: true,
          message: 'Your profile has been successfully updated.',
        },
      });
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  // The text input fields for the form.
  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={handleChange}
          name="description"
          rows={5}
        />
      </Form.Group>

      {errors?.decription?.map((message, idx) => (
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
      <Button className={`${btnStyles.Button}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col
            md={5}
            lg={6}
            className="d-none d-md-block p-0 p-md-2 mt-4 text-center"
          >
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="py-2 p-0 p-md-2 my-4 text-center" md={7} lg={6}>
            <Container className={appStyles.Content}>
              <Form.Group>
                {image && (
                  <figure>
                    <Image src={image} fluid />
                  </figure>
                )}
                {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div>
                  <Form.Label
                    className={`${btnStyles.Button}`}
                    htmlFor="photo-upload"
                  >
                    Change the image
                  </Form.Label>
                </div>
                <Form.File
                  id="photo-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfileData({
                        ...profileData,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
              </Form.Group>
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
      <SecondaryNav mobile />
    </>
  );
}

export default ProfileEditForm;
