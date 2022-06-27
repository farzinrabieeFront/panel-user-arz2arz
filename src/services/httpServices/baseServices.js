import axios from "../Http";


let baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://194.5.192.82:4000/api/v1/customer"
    : "https://main.arz2arz.net/api/v1/customer";

const baseServices = {
  config: function (body) {
    return axios.get(`${baseUrl}/exchange/config/`);
  },
  market: function (body) {
    return axios.get(`${baseUrl}/exchange/config/markets/`);
  },
  exchange: function (body) {
    return axios.get(`${baseUrl}/exchange/config/exchange/`);
  },
};

export default baseServices;
// {{url}}/api/v1/customer/exchange/config
// {{url}}/api/v1/customer/exchange/config/markets
