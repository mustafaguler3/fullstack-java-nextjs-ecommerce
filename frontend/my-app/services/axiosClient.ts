import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (Adding token)
axiosClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Response interceptor (error handling)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message;

    if (error.response) {
      message = error.response.data?.message || "A Error Occurred";
      return Promise.reject(error.response.data);
    } else if (error.request) {
      message = "No response from server";
      return Promise.reject(message);
    } else {
      message = error.message || "Unexpected error";
      return Promise.reject(message);
    }
  }
);

export default axiosClient;