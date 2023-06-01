import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const FeedbackAlert = ({ variant, message }) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert className="my-4" variant={variant} onClose={() => setShow(false)} dismissible>
                {message}
            </Alert>
        );
    }
};

export default FeedbackAlert;
