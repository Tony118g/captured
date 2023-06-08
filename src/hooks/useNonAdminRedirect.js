import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Checks if the user is an admin user and
 * redirects them to the home page if not.
 */
const useNonAdminRedirect = (userRoleAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const userAdminStatus = (await axios.get('dj-rest-auth/user/')).data.is_admin_user;
        if (!userAdminStatus) {
          history.push('/');
        }
      } catch (err) {
        if (userRoleAuthStatus === 'nonAdmin') {
          history.push('/');
        }
      }
    };

    handleMount();
  }, [history]);
};

export default useNonAdminRedirect;
