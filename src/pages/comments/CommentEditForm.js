/* eslint-disable */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CommentCreateEditForm.module.css';
import btnStyles from '../../styles/Button.module.css';

/**
 * Renders the comment edit form.
 */
function CommentEditForm(props) {
  const {
    id,
    content,
    setShowEditForm,
    setComments,
  } = props;

  const [formContent, setFormContent] = useState(content);

  /**
   * Converts inputed data into Key: Value pairs.
   */
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /**
   * Pushes data to the API and updates the relevant comment.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              content: formContent.trim(),
              updated_at: 'now',
            }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <Button
          className={`${btnStyles.CancelBtn} mr-3`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </Button>
        <Button
          className={btnStyles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </Button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
