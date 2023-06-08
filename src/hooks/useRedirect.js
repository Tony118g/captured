import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Checks if the user is authenticated and
 * redirects them to the home page if not.
 */
const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        if (userAuthStatus === 'loggedIn') {
          history.push('/');
        }
      } catch (err) {
        if (userAuthStatus === 'loggedOut') {
          history.push('/');
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};

export default useRedirect;
