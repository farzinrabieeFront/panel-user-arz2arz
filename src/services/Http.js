import axios from "axios";
import { cookieServices } from ".";
import { Toastify } from "../utils";
// import handleRefreshToken from "./refreshToken";

const debug = false;

//request interceptor
axios.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const _access_token = cookieServices.get("accessToken")
        const _refresh_token = cookieServices.get("refreshToken")

        const isAuth = _access_token && _refresh_token

        if (isAuth) {
            config.headers["access_token"] = _access_token;
            if (config.url.includes('renewAccessToken')) {
                config.headers["refresh_token"] = _refresh_token;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (debug) console.log("[http] error", error);

        /** Do something with response error */
        if (error.response.status >= 500) {
            Toastify.error('ارتباط با سرور قطع است ')
            return
        } else if (error.response.status >= 400) {
            if (error.response.status === 401) {
                // console.log(error.config);
                return Promise.reject(error.response);
            } else {
                // 403 , 404 , 406 , 422
                return Promise.reject(error.response.data);
            }
        }

        console.log('default');
        return Promise.reject(error);
    }
);

const methods = {
    axios,
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
};

export default methods;
