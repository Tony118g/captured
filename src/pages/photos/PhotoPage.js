import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo";
import Comment from "../comments/Comment";

function PhotoPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: photo }, { data: comments }] = await Promise.all(
                    [
                        axiosReq.get(`/photos/${id}`),
                        axiosReq.get(`/comments/?photo=${id}`),
                    ]
                );
                setPhoto({ results: [photo] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="d-none d-md-block py-2 p-0 p-lg-2" md={4}>
                <p>Post a photo, Feed, Liked photos, Tours</p>
                <p>Popular profiles for desktop</p>
            </Col>
            <Col md={8} className="p-0 p-lg-2">
                <p>Popular profiles for mobile</p>
                <Photo {...photo.results[0]} setPhotos={setPhoto} photoPage />
                <Container className={`${appStyles.Content} my-2`}>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            photo={id}
                            setPhoto={setPhoto}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        comments.results.map(comment => (
                            <Comment key={comment.id} {...comment} />
                        ))
                    ) : currentUser ? (
                        <span>There are no comments, add one yourself!</span>
                    ) : (
                        <span>There are no comments at the moment.</span>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default PhotoPage;
