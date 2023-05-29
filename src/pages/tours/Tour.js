import React, { useEffect, useState } from "react";
import { Card, Media, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import AttendeeProfileLink from "../profiles/AttendeeProfileLink";

const Tour = (props) => {
    const {
        id,
        title,
        description,
        country,
        city,
        start_date,
        end_date,
        guide,
        price,
        booking_means,
        image,
        updated_at,
        attendance_id,
        attendance_count,
        has_passed,
        setTours,
    } = props;

    const currentUser = useCurrentUser();
    const [attendances, setAttendances] = useState({ results: [] });
    const history = useHistory();
    const dateFields = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: attendances }] = await Promise.all([
                    axiosReq.get(`/attendances/?tour=${id}`),
                ]);
                setAttendances(attendances);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id, attendance_count]);

    const handleEdit = () => {
        history.push(`/tours/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/tours/${id}/`);
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAttend = async () => {
        try {
            const { data } = await axiosRes.post("/attendances/", { tour: id });
            setTours((prevTours) => ({
                ...prevTours,
                results: prevTours.results.map((tour) => {
                    return tour.id === id
                        ? {
                              ...tour,
                              attendance_count: tour.attendance_count + 1,
                              attendance_id: data.id,
                          }
                        : tour;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnattend = async () => {
        try {
            await axiosRes.delete(`/attendances/${attendance_id}/`);
            setTours((prevTours) => ({
                ...prevTours,
                results: prevTours.results.map((tour) => {
                    return tour.id === id
                        ? {
                              ...tour,
                              attendance_count: tour.attendance_count - 1,
                              attendance_id: null,
                          }
                        : tour;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    {title && (
                        <Card.Title className="text-center">{title}</Card.Title>
                    )}

                    <div className="d-flex align-items-center">
                        <span>Added on: {updated_at}</span>
                        {currentUser?.is_admin_user && (
                            <EditDeleteDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
                {image && <Card.Img src={image} alt={title} />}
            </Card.Body>
            <Card.Body className="justify-content-between">
                <div className="d-flex justify-content-around">
                    {country && <Card.Text>Country: {country}</Card.Text>}
                    {city && <Card.Text>City: {city}</Card.Text>}
                </div>
                <div className="d-flex justify-content-around">
                    {price && <Card.Text>Price: {price}</Card.Text>}
                    {guide && <Card.Text>Guide: {guide}</Card.Text>}
                </div>
                <hr />
                {start_date === end_date ? (
                    <Card.Text>
                        One day tour on{" "}
                        {new Date(start_date).toLocaleString(
                            "en-GB",
                            dateFields
                        )}
                    </Card.Text>
                ) : (
                    <Card.Text>
                        From{" "}
                        {new Date(start_date).toLocaleString(
                            "en-GB",
                            dateFields
                        )}{" "}
                        to{" "}
                        {new Date(end_date).toLocaleString("en-GB", dateFields)}
                    </Card.Text>
                )}
                <hr />
                {booking_means && (
                    <Card.Text>How to join: {booking_means}</Card.Text>
                )}
                <hr />
                {description && <Card.Text>{description}</Card.Text>}

                <div>
                    {has_passed ? (
                        <></>
                    ) : attendance_id ? (
                        <span
                            onClick={handleUnattend}
                            className={btnStyles.UnattendBtn}
                        >
                            Unmark as attending
                        </span>
                    ) : currentUser ? (
                        <span
                            onClick={handleAttend}
                            className={btnStyles.Button}
                        >
                            Mark as attending
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>Log in to mark as attending!</Tooltip>
                            }
                        >
                            <span>Mark as attending</span>
                        </OverlayTrigger>
                    )}
                    {has_passed ? (
                        <span className="float-right" onClick={handleShow}>
                            Attended: {attendance_count}
                        </span>
                    ) : (
                        <span className="float-right" onClick={handleShow}>
                            Attending: {attendance_count}
                        </span>
                    )}
                </div>

                <Modal scrollable show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Users that have marked attendance:</p>
                        {attendances.results.length ? (
                            attendances.results.map((attendance) => (
                                <AttendeeProfileLink
                                    key={attendance.id}
                                    {...attendance}
                                />
                            ))
                        ) : (
                            <span>
                                No users have marked attendance for this event.
                            </span>
                        )}
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default Tour;
