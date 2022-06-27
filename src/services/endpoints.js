let baseUrl = "",
  trade = "";
let developmentMode = true;

if (developmentMode) {
  baseUrl = "https://main.arz2arz.net/";
  trade = "http://194.5.192.82:8088/v1/orders";
} else {
  trade = "https://backend.arz2arz.com/socket";
  baseUrl = "https://backend.arz2arz.com/mbackend";
}

const endpoints = {
  auth: `${baseUrl}/auth`,
  spot: `${baseUrl}/spot/`,
  ticket: `${baseUrl}/ticket/`,
  verification: `${baseUrl}/profile/identity/`,
  profile: `${baseUrl}/profile`,
  security: `${baseUrl}/profile/2fa/`,
  generateOtp: `${baseUrl}/profile/account/generateOtp/`,
  resetPass: `${baseUrl}/profile/account/changePassword/`,
  deviceManagement: `${baseUrl}/session/`,
  card: `${baseUrl}/profile/bankAccount/`,
  fiat: `${baseUrl}/fiat/`,
  crypto: `${baseUrl}/spot/`,
  wallet: `${baseUrl}/spot/`,
  history: `${baseUrl}/`,
  exchange: `${baseUrl}/exchange`,
  favoritesMarket: `${baseUrl}/spot/favorites`,
  notification: `${baseUrl}/notifications`,
};

export default endpoints;
