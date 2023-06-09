/* eslint-disable */
import jwtDecode from 'jwt-decode';
import { axiosReq } from '../api/axiosDefaults';

/**
 * Enables infinite scroll functionality.
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // console.log(err);
  }
};

/**
 * Increments the following and follower counts by 1.
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    }
    : profile.is_owner
      ? { ...profile, following_count: profile.following_count + 1 }
      : profile;
};

/**
 * Decreases the following and follower counts by 1.
 */
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    }
    : profile.is_owner
      ? { ...profile, following_count: profile.following_count - 1 }
      : profile;
};

/**
 * Sets a token timestamp in the browser storage.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
};

/**
 * Indicates if users token should be refreshed or not.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

/**
 * Removes the token timestamp value value from the
 * local storage if the user logs out
 * or their refresh token has expired.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};
