import { MakeRequestAsync } from "./axios-upload-only";
import { POST } from "../constants/request-type";
import { upload, create_upload_web } from "../constants/routes";
import { service_api } from "../constants/url";

const uploadFile = async (data) => {
  const file = new FormData();
  file.append("file", data);

  const request_details = {
    type: POST,
    url: service_api,
    route: upload + "/" + create_upload_web,
    data: file,
    token: null
  };

  const response = await MakeRequestAsync(request_details);
  return response;
};

export { uploadFile };
