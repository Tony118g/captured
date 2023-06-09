import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

/**
 * A reusable feedback alert component for displaying feedback to the user.
 */
function FeedbackAlert({ variant, message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        className="my-4"
        variant={variant}
        onClose={() => setShow(false)}
        dismissible
      >
        {message}
      </Alert>
    );
  }
  return null;
}

export default FeedbackAlert;
