import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

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
    const history = useHistory();
    const dateFields = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

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
                        <span className={btnStyles.UnattendBtn}>Unmark as attending</span>
                    ) : currentUser ? (
                        <span className={btnStyles.Button}>Mark as attending</span>
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
                        <span className="float-right">
                            Attended: {attendance_count}
                        </span>
                    ) : (
                        <span className="float-right">
                            Attending: {attendance_count}
                        </span>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Tour;
