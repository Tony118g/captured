import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/captured-logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <Navbar.Brand className={styles.Logo} href="#home">
                    <img src={logo} alt="Captured logo" height="60"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>About</Nav.Link>
                        <Nav.Link>Login</Nav.Link>
                        <Nav.Link>Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
