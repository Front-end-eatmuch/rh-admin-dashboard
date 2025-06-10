import { service_api } from "../constants/url";
import { admin, get_all_admin } from "../constants/routes";
import { MakeRequest, MakeRequestAsync } from "./axios";
import { GET } from "../constants/request-type";
import Axios from "axios";

const tokenExpired = async () => {
  if (
    !sessionStorage.getItem("auth_token") ||
    sessionStorage.getItem("auth_token") === undefined
  )
    sessionStorage.clear();

  const request_details = {
    type: GET,
    url: service_api,
    route: admin + "/" + get_all_admin,
    data: null,
    token: sessionStorage.getItem("auth_token")
  };
  const response = MakeRequestAsync(request_details).catch((err) => {
    console.log("Token Invalid");
    sessionStorage.clear();
    return (window.location.href = "/");
  });

  return console.log("Token Valid");
};

export { tokenExpired };
