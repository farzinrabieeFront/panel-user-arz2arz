import Cookies from "universal-cookie";
const cookies = new Cookies();

const cookieServices = {
  set(key, value, options = {}) {
    cookies.set(key, value, { path: "/", ...options });
  },
  getAll() {
    return cookies.getAll();
  },
  get(key) {
    return cookies.get(key);
  },
  remove(key) {
    cookies.remove(key);
  },
  clear() {
  },
};

export default cookieServices;
