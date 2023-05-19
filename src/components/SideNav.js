import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";

const SideNav = ({ mobile }) => {
    return (
        <Container className={`${appStyles.Content} ${mobile && "d-md-none text-center mt-3"}`}>
            <Link to="/photos/create" className={mobile ? "col-3" : "d-block pt-2"}>
                <i className="fa-regular fa-plus"></i>
                <p className={mobile ? "d-none" : "d-inline"}>
                    Post photo
                </p>
            </Link>
            <Link to="/liked" className={mobile ? "col-3" : "d-block pt-2"}>
                <i class="fa-solid fa-heart"></i>
                <p className={mobile ? "d-none" : "d-inline"}>
                    Liked photos
                </p>
            </Link>
            <Link to="/feed" className={mobile ? "col-3" : "d-block pt-2"}>
                <i class="fa-solid fa-rss"></i>
                <p className={mobile ? "d-none" : "d-inline"}>
                    Feed
                </p>
            </Link>
            <Link to="/tours" className={mobile ? "col-3" : "d-block pt-2"}>
                <i class="fa-solid fa-camera-retro"></i>
                <p className={mobile ? "d-none" : "d-inline"}>
                    Tours
                </p>
            </Link>
        </Container>
    );
};

export default SideNav;
