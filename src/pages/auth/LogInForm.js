/* eslint-disable */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';
import styles from '../../styles/LogInSignUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import useRedirect from '../../hooks/useRedirect';

function LogInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = logInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setLogInData({
      ...logInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', logInData);
      setCurrentUser(data.user);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Container className={`${styles.Container} p-4 text-center `}>
        <h1 className={styles.Heading}>Log In</h1>
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.username?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            type="submit"
          >
            Log In
          </Button>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx} className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <Link to="/signup">
          Do you not have an account? <span>Sign up now!</span>
        </Link>
      </Container>
    </div>
  );
}

export default LogInForm;
