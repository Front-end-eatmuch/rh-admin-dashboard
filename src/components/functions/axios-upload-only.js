import Axios from "axios";
import { POST, UPDATE, GET, DELETE, PATCH } from "../constants/request-type";

const error_type = "no-type defined";

const MakeRequestAsync = async ({
  type,
  url,
  route,
  data,
  token,
  contentType = "application/json"
}) => {
  let config = {
    headers: {
      "Content-Type": contentType,
      authorization: token,
      session: process.env.REACT_APP_API_KEY
    }
  };
  switch (type) {
    case POST:
      return await Axios.post(`${url}/${route}`, data, config);
    // break;
    case UPDATE:
      return await Axios.put(`${url}/${route}`, data, config);
    // break;
    case PATCH:
      return await Axios.patch(`${url}/${route}`, data, config);
    // break;
    case GET:
      return await Axios.get(`${url}/${route}`, config, data);
    // break;
    case DELETE:
      return await Axios.delete(`${url}/${route}`, config, data);
    // break;
    default:
      return error_type;
  }
};

const MakeRequest = ({
  type,
  url,
  route,
  data,
  token,
  contentType = "application/json"
}) => {
  let config = {
    headers: {
      "Content-Type": contentType,
      authorization: token
    }
  };
  switch (type) {
    case POST:
      return Axios.post(`${url}/${route}`, data, config);
    // break;
    case UPDATE:
      return Axios.put(`${url}/${route}`, data, config);
    // break;
    case PATCH:
      return Axios.patch(`${url}/${route}`, data, config);
    // break;
    case GET:
      return Axios.get(`${url}/${route}`, config, data);
    // break;
    case DELETE:
      return Axios.delete(`${url}/${route}`, data, config);
    // break;
    default:
      return error_type;
  }
};

export { MakeRequestAsync, MakeRequest };
