/* eslint-disable */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * A provider to give context to children
 */
export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Axios interceptor to refresh token if 401 error and
   * redirect user to login if refresh fails
   */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('login');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/login');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      },
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}
