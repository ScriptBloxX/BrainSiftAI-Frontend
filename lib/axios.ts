import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://brain-sift-ai-backend.onrender.com";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

let refreshPromise: Promise<string> | null = null;

const refreshToken = async (): Promise<string> => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    throw new Error("No user found");
  }

  const user = JSON.parse(storedUser);
  if (!user.refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/authentication/refresh-token`, {
      refreshToken: user.refreshToken,
    });

    const { accessToken } = response.data;
    
    const updatedUser = { ...user, token: accessToken };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    return accessToken;
  } catch (error) {
    localStorage.removeItem("user");
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
        } else {
          refreshPromise = refreshToken();
          await refreshPromise;
          refreshPromise = null;
        }

        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.token) {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${user.token}`;
            }
          }
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
