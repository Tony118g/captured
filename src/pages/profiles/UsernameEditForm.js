/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory, useParams } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import SecondaryNav from '../../components/SecondaryNav';

/**
 * Renders the username editing form.
 */
function UsernameEditForm() {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  /**
   * Populates form with current username or
   * reroutes the user if they are not
   * the correct user according to id.
   */
  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push('/');
    }
  }, [currentUser, history, id]);

  /**
   * Pushes data to the API, displays error messages
   * for invalid data if any and sets
   * a feedback message to be shown to the user
   * for successful update.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put('/dj-rest-auth/user/', {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.push({
        pathname: `/profiles/${currentUser?.profile_id}`,
        state: {
          showFeedback: true,
          message: 'Username edited successfully.',
        },
      });
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Row>
        <Col className="py-2 mx-auto text-center mt-4" md={6}>
          <Container className={appStyles.Content}>
            <Form onSubmit={handleSubmit} className="my-2">
              <Form.Group>
                <Form.Label>Change username</Form.Label>
                <Form.Control
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
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
            </Form>
          </Container>
        </Col>
      </Row>
      <SecondaryNav mobile />
    </>
  );
}

export default UsernameEditForm;
