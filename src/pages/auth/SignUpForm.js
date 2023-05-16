import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    })
    const { username, password1, password2 } = signUpData;

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <Container
                className={`${styles.Container} p-4 text-center `}
            >
                <h1 className={styles.Heading}>Sign up</h1>
                <Form className="mb-4">
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

                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Bright}`}
                        type="submit"
                    >
                        sign up
                    </Button>
                </Form>
                <Link to="/login">
                    Already have an account? <span>Log in here</span>
                </Link>
            </Container>
        </div>
    );
};

export default SignUpForm;
