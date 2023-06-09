import React from 'react';
import Asset from './Asset';
import appStyles from '../App.module.css';

/**
 * Displays a message for non-existent pages.
 */
function NotFound() {
  return (
    <div className={`${appStyles.Content} mt-5 lead`}>
      <Asset message="Sorry, the page you're looking for does not exist" />
    </div>
  );
}

export default NotFound;
