import React from "react";
import { Card, Media } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

const Tour = (props) => {
    const {
        id,
        title,
        description,
        country,
        city,
        time_period,
        guide,
        price,
        booking_means,
        image,
        updated_at,
        attendance_id,
        attendance_count,
        setTours,
    } = props;

    const currentUser = useCurrentUser();
    const history = useHistory();

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
                <Card.Img src={image} alt={title} />
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
                {time_period && (
                    <Card.Text>Time period: {time_period}</Card.Text>
                )}
                <hr />
                {booking_means && (
                    <Card.Text>How to join: {booking_means}</Card.Text>
                )}
                <hr />
                {description && <Card.Text>{description}</Card.Text>}
            </Card.Body>
        </Card>
    );
};

export default Tour;
