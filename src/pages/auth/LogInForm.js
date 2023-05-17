import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import styles from "../../styles/LogInSignUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import axios from "axios";

const LogInForm = () => {

    const [logInData, setLogInData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = logInData;

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
            await axios.post("/dj-rest-auth/login/", logInData);
            history.push("/");
        } catch (err) {
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

                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Bright}`}
                        type="submit"
                    >
                        Log In
                    </Button>
                </Form>
                <Link to="/signup">
                Don't have an account? <span>Sign up now!</span>
                </Link>
            </Container>
        </div>
    );
};

export default LogInForm;
