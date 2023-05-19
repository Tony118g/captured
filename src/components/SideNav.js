import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";

const SideNav = ({ mobile }) => {
    return (
        <Container className={`${appStyles.Content} ${mobile && "d-md-none text-center mt-3"}`}>
            <Link to="/photos/create" className="col-3">
                <i className="fa-regular fa-plus"></i>
                <p className={`${mobile && "d-none"}`}>
                    Post photo
                </p>
            </Link>
            <Link to="/liked" className="col-3">
                <i class="fa-solid fa-heart"></i>
                <p className={`${mobile && "d-none"}`}>
                    Liked photos
                </p>
            </Link>
            <Link to="/feed" className="col-3">
                <i class="fa-solid fa-rss"></i>
                <p className={`${mobile && "d-none"}`}>
                    Feed
                </p>
            </Link>
            <Link to="/tours" className="col-3">
                <i class="fa-solid fa-camera-retro"></i>
                <p className={`${mobile && "d-none"}`}>
                    Tours
                </p>
            </Link>
        </Container>
    );
};

export default SideNav;
