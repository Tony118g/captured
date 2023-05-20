import React, { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";

function CreateCommentForm(props) {
    const { photo, setPhoto, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                photo,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPhoto((prevPhoto) => ({
                results: [
                    {
                        ...prevPhoto.results[0],
                        comments_count: prevPhoto.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profileImage} />
                        </Link>
                    </InputGroup>

                    <Form.Control
                        placeholder="your comment..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />

                    <button disabled={!content.trim()} type="submit">
                        comment
                    </button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default CreateCommentForm;
