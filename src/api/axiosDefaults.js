import axios from 'axios';

// The configuration for axios
axios.defaults.baseURL = 'https://captured-drf-api.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Axios instances to be used as interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create();
