import axios from "axios";

export const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_AXIOS_BASEURL,
  baseURL: "http://localhost:3000",
});

let isRefreshing = false; // Flag to track the refresh process
let failedQueue: any[] = []; // Queue to hold requests while token is being refreshed

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    const response = await apiClient.get("/api/refresh", {
      withCredentials: true,
    });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.log("sdfsdfsdf");

    localStorage.removeItem("accessToken");
    window.location.href =
      "https://hospital-mangement-backend-jnh5.vercel.app/login"; // Redirect to login when refresh fails
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

    // Check for 401/403 error (token expiration)
    if (error.response.status === 401 || error.response.status === 403) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // If a refresh is already happening, queue the request
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        // Start refresh process
        isRefreshing = true;

        try {
          const newAccessToken = await refreshAccessToken();
          processQueue(null, newAccessToken); // Process queued requests
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null); // Reject queued requests
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);
