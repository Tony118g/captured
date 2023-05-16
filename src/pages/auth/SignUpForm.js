import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
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
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </Form.Group>

                    <Form.Group controlId="password2">
                        <Form.Label className="d-none">Confirm password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
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
