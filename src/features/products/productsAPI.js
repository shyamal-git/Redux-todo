import axiosInstance from "../../api/axios";

export const fetchProductsAPI = async () => {
  const response = await axiosInstance.get(
    "/products?limit=30&select=title,brand,category,price,stock,rating,thumbnail"
  );

  return response.data;
};

export const createProductAPI = async (productData) => {
  const response = await axiosInstance.post("/products/add", productData);

  return response.data;
};

export const updateProductAPI = async ({ id, productData }) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);

  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);

  return response.data;
};
