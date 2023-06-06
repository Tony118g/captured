import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
    useLocation,
    useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Photo from "./Photo";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import SecondaryNav from "../../components/SecondaryNav";
import FeedbackAlert from "../../components/FeedbackAlert";

function PhotoPage() {
    const location = useLocation();
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
        <>
            <Row>
                <Col className="p-2" md={4}>
                    <div className={appStyles.FixedContainer}>
                        <SecondaryNav />
                        <PopularProfiles />
                    </div>
                </Col>
                <Col md={8} className={`${appStyles.ContentColumn} p-2 `}>
                    <SecondaryNav mobile />
                    <PopularProfiles mobile />
                    {location.state?.showFeedback && (
                        <FeedbackAlert
                            variant="info"
                            message={location.state?.message}
                        />
                    )}
                    <Photo
                        {...photo.results[0]}
                        setPhotos={setPhoto}
                        photoPage
                    />
                    <Container fluid className={`${appStyles.Content} my-2`}>
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
                            <InfiniteScroll
                                children={comments.results.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        {...comment}
                                        setPhoto={setPhoto}
                                        setComments={setComments}
                                    />
                                ))}
                                dataLength={comments.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!comments.next}
                                next={() =>
                                    fetchMoreData(comments, setComments)
                                }
                            />
                        ) : currentUser ? (
                            <span>
                                There are no comments, add one yourself!
                            </span>
                        ) : (
                            <span>There are no comments at the moment.</span>
                        )}
                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default PhotoPage;
