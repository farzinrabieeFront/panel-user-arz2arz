import axios from 'axios';
import { cookies, getUniversalCookies } from './cookies'

export default class TokenService {
    getAccessToken() {
        return getUniversalCookies().get('accessToken')
    }

    getRefreshToken() {
        return getUniversalCookies().get('refreshToken')
    }

    changeAccessToken(new_token) {
        let coockieOptions = { path: "/" };
        if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
            coockieOptions = { domain: "arz2arz.net" };

        cookies.setCookies('accessToken', new_token, coockieOptions)
    }

    removeTokens() {
        let coockieOptions = { path: "/" };
        if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
            coockieOptions = { domain: "arz2arz.net" };

        cookies.removeCookie('accessToken', coockieOptions)
        cookies.removeCookie('refreshToken', coockieOptions)

    }

    refreshAccessToken() {
        const baseURL =
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? "http://194.5.192.82:4000/api/v1/customer"
                : "https://main.arz2arz.net/api/v1/customer";

        return axios({
            method: 'get',
            url: `/auth/renewAccessToken/`,
            baseURL,
            headers: {
                'access_token': this.getAccessToken,
                'refresh_token': this.getRefreshToken,
            }
        })
    }

}



