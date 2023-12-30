import axios from 'axios';
export const API_URL = 'http://192.168.18.204:8000/api/v1';

// export const axios_auth = axios.create({
//     baseURL: baseUrl,
//     // withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
//     },
//   });

export const axios_no_auth = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
