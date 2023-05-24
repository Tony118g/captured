import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Tour from "./Tour";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import SideNav from "../../components/SideNav";
import PopularProfiles from "../profiles/PopularProfiles";

function ToursPage({ message, filter = "" }) {
    const [tours, setTours] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const { data } = await axiosReq.get(`/tours/?${filter}`);
                setTours(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchTours();
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2" md={4}>
                <SideNav />
                <PopularProfiles />
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <SideNav mobile />
                <PopularProfiles mobile />
                {hasLoaded ? (
                    <>
                        {tours.results.length
                            ? tours.results.map((tour) => (
                                  <Tour
                                      key={tour.id}
                                      {...tour}
                                      setTours={setTours}
                                  />
                              ))
                            : console.log("show no results message")}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default ToursPage;
