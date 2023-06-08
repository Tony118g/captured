/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Media,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { EditDeleteDropdown } from '../../components/EditDeleteDropdown';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import AttendeeProfileLink from '../profiles/AttendeeProfileLink';
import FeedbackAlert from '../../components/FeedbackAlert';

function Tour(props) {
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
  const [showFeedback, setShowFeedback] = useState(false);
  const dateFields = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const attendanceWordTense = has_passed ? 'attended' : 'attending';

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
      setShowFeedback(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttend = async () => {
    try {
      const { data } = await axiosRes.post('/attendances/', { tour: id });
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
    <>
      {showFeedback ? (
        <FeedbackAlert
          variant="info"
          message={`"${title}" has been deleted.`}
        />
      ) : (
        <Card className="mt-2">
          <Card.Body className={appStyles.CardTop}>
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
                    keyWord="tour"
                    editable={!has_passed}
                  />
                )}
              </div>
            </Media>
            {image && <Card.Img src={image} alt={title} />}
          </Card.Body>
          <Card.Body>
            <Row className="p-1">
              <Col>
                {country && (
                  <Card.Text>
                    Country:
                    <span className={appStyles.InfoText}>{country}</span>
                  </Card.Text>
                )}
              </Col>
              <Col>
                {city && (
                  <Card.Text>
                    City:
                    <span className={appStyles.InfoText}>{city}</span>
                  </Card.Text>
                )}
              </Col>
            </Row>
            <Row className="p-1">
              <Col>
                {price && (
                  <Card.Text>
                    Guide:
                    <span className={appStyles.InfoText}>{guide}</span>
                  </Card.Text>
                )}
              </Col>
              <Col>
                {guide && (
                  <Card.Text>
                    Price:
                    <span className={appStyles.InfoText}>${price}</span>
                  </Card.Text>
                )}
              </Col>
            </Row>
            <hr />
            {start_date === end_date ? (
              <Card.Text className="p-1">
                One day tour on
                <span className={appStyles.InfoText}>
                  {new Date(start_date).toLocaleString('en-GB', dateFields)}
                </span>
              </Card.Text>
            ) : (
              <Card.Text className="p-1">
                From
                <span className={appStyles.InfoText}>
                  {new Date(start_date).toLocaleString('en-GB', dateFields)}
                </span>
                to
                <span className={appStyles.InfoText}>
                  {new Date(end_date).toLocaleString('en-GB', dateFields)}
                </span>
              </Card.Text>
            )}
            <hr />
            {booking_means && (
              <Card.Text className="p-1">
                How to join:
                <span className={appStyles.InfoText}>{booking_means}</span>
              </Card.Text>
            )}

            {description && (
              <>
                <hr />
                <Card.Text className="p-1">{description}</Card.Text>
              </>
            )}
            <hr />
            <div>
              {attendance_id ? (
                <Button
                  onClick={handleUnattend}
                  className={btnStyles.UnattendBtn}
                >
                  Unmark as {attendanceWordTense}
                </Button>
              ) : currentUser ? (
                <Button onClick={handleAttend} className={btnStyles.Button}>
                  Mark as {attendanceWordTense}
                </Button>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to mark attendance!</Tooltip>}
                >
                  <span>
                    <Button
                      className={`${btnStyles.Button} ${btnStyles.DisabledBtn}`}
                    >
                      Mark as {attendanceWordTense}
                    </Button>
                  </span>
                </OverlayTrigger>
              )}
              <Button
                className={`${btnStyles.Button} float-right text-capitalize`}
                onClick={handleShow}
              >
                {attendanceWordTense}: {attendance_count}
              </Button>
            </div>

            <Modal scrollable show={show} onHide={handleClose}>
              <Modal.Header closeButton className={appStyles.CardTop}>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Users that have marked attendance:</p>
                {attendances.results.length ? (
                  attendances.results.map((attendance) => (
                    <AttendeeProfileLink key={attendance.id} {...attendance} />
                  ))
                ) : (
                  <span>
                    <hr />
                    No users have marked attendance for this event.
                  </span>
                )}
              </Modal.Body>
            </Modal>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Tour;
