/* eslint-disable */
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CommentCreateEditForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import Avatar from '../../components/Avatar';

/**
 * Renders the comment creation form.
 */
function CreateCommentForm(props) {
  const {
    photo,
    setPhoto,
    setComments,
    profileImage,
    profile_id,
  } = props;
  const [content, setContent] = useState('');

  /**
   * Converts inputed data into Key: Value pairs.
   */
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  /**
   * Pushes data to the API.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post('/comments/', {
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
      setContent('');
    } catch (err) {
      // console.log(err);
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

        <Button
          className={`${btnStyles.Button} btn d-block ml-auto mt-2`}
          disabled={!content.trim()}
          type="submit"
        >
          comment
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CreateCommentForm;
