import axios from "../Http";

let baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://194.5.192.82:4000/api/v1/customer"
    : "https://main.arz2arz.net/api/v1/customer";

const authenticationServices = {
  download: {
    nationalCardImage: function (id, name, downloadConfig) {
      return axios.get(
        `${baseUrl}/profile/identity/static/serve/${id}/${name}`,
        downloadConfig
      );
    },
    video: function (id, name, downloadConfig) {
      return axios.get(
        `${baseUrl}/profile/identity/static/serve/${id}/${name}`,
        downloadConfig
      );
    },
  },
};

export default authenticationServices;
