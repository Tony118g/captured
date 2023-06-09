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
import useRedirect from '../../hooks/useRedirect';

/**
 * Renders the signup form.
 */
function SignUpForm() {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  /**
   * Converts inputed data into Key: Value pairs.
   */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Pushes data to the API and redirects to login page
   * or displays error messages for invalid data.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push('/login');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Container className={`${styles.Container} p-4 text-center `}>
        <h1 className={styles.Heading}>Sign up</h1>
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
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password1?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>

          {errors.password2?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            type="submit"
          >
            sign up
          </Button>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx} className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <Link to="/login">
          Already have an account? <span>Log in here</span>
        </Link>
      </Container>
    </div>
  );
}

export default SignUpForm;
