import axiosInstance from "../../api/axios";

export const loginAPI = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await axiosInstance.post("/users/add", userData);

  return response.data;
};
