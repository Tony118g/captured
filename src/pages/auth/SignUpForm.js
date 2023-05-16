import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <div>
            <Container>
                <h1>Sign up</h1>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                    </Form.Group>

                    <Form.Group controlId="password2">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        sign up
                    </Button>
                </Form>
            </Container>
            <Container>
                <Link to="/login">
                    Already have an account? <span>Log in here</span>
                </Link>
            </Container>
        </div>
    );
};

export default SignUpForm;
