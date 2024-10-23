import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
  // baseURL: "http://localhost:3000",
});

const refreshAccessToken = async () => {
  try {
    const response = await apiClient.get("/api/refresh", {
      withCredentials: true,
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Axios request interceptor to include access token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const newAccessToken = await refreshAccessToken();
        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
