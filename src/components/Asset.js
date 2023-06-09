import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from '../styles/Asset.module.css';

/**
 * A multipurpose component who's display
 * content depends on the props passed.
 */
function Asset({ spinner, src, message }) {
  return (
    <div className={`${styles.Asset}`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Asset;
