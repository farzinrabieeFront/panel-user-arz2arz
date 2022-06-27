import axios from "../Http";

let baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://194.5.192.82:4000/api/v1/customer"
    : "https://main.arz2arz.net/api/v1/customer";

const profileServices = {
  userData: function () {
    return axios.get(`${baseUrl}/profile/account/info/`);
  },
};

export default profileServices;
