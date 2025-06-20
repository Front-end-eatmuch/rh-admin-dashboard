import Axios from "axios";
import { POST, UPDATE, GET, DELETE, PATCH } from "../constants/request-type";
import { encryptData } from "./cryptojs";

const error_type = "no-type defined";

const MakeRequestAsync = async ({
  type,
  url,
  route,
  data,
  token,
  contentType = "application/json"
}) => {
    console.log(contentType)
  let config = {
    headers: {
      "Content-Type": contentType,
      authorization: encryptData(token),
      // session: process.env.REACT_APP_API_KEY
    },
    withCredentials: true // Très important
  };
  switch (type) {
    case POST:
      return await Axios.post(
        `${url}/${route}`,
        contentType === "multipart/form-data" ? data : {
          // encrypted: encryptData(JSON.stringify(data))
          encrypted: encryptData(JSON.stringify(data))
        },
        // {
        //   encrypted: encryptData(JSON.stringify(data)),
        //   // data: data
        // },
        config
      );
    // break;
    case UPDATE:
      return await Axios.put(
        `${url}/${route}`,
        // {
        //   encrypted: encryptData(JSON.stringify(data))
        // },
        contentType === "multipart/form-data" ? data : {
          // encrypted: encryptData(JSON.stringify(data))
          encrypted: encryptData(JSON.stringify(data))
        },
        config
      );
    // break;
    case PATCH:
      return await Axios.patch(
        `${url}/${route}`,
        {
          encrypted: encryptData(JSON.stringify(data))
        },
        config
      );
    // break;
    case GET:
      return await Axios.get(`${url}/${route}`, config, {
        encrypted: encryptData(JSON.stringify(data))
      });
    // break;
    case DELETE:
      return await Axios.delete(`${url}/${route}`, config, {
        encrypted: encryptData(JSON.stringify(data))
      });
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
