import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const update = async (data, id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, setToken, deleteBlog };
