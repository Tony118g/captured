import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
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
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-0">
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="your comment..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>

                <button
                    className={`${btnStyles.Button} btn d-block ml-auto mt-2`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    comment
                </button>
            </Form.Group>
        </Form>
    );
}

export default CreateCommentForm;
