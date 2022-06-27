import { useState } from "react";
import * as urls from "../constants/urls";
import axios from "../../services/Http";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import http from '../configs/httpRequest'


let baseUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://194.5.192.82:4000/api/v1/customer"
        : "https://main.arz2arz.net/api/v1/customer";

export default function useMainApi() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
    ]);

    function apiCallMiddleware(_url) {
        if (urls.PublicApis.includes(_url)) return true
        else {
            if (cookies.accessToken && cookies.refreshToken)
                return true;
            else return false;
        }
    }

    async function get(
        _url,
        { _config = {}, _headers = {}, _params = {}, _baseUrl = baseUrl } = {}
    ) {
        if (apiCallMiddleware(_url))
            try {
                _config.params = _params;
                setLoading(true);

                const response = await http.get(`${_baseUrl}${_url}`, _config);
                if (response.status === 200) return response.data;
            } catch (error) {
                // console.log(error);
                // await errorMiddleware(error)
            } finally {
                setLoading(false);
            }
    }

    async function post(
        _url,
        _body,
        { _config = {}, _headers = {}, _params = {} } = {}
    ) {
        if (apiCallMiddleware(_url))
            try {
                const config = {
                    _config,
                    params: _params,
                };

                setLoading(true);

                const response = await http.post(`${baseUrl}${_url}`, _body, config);

                if (response.status === 200 || (response.status === 201 && response.data.success)) return response.data;
            } catch (error) {
                // await errorMiddleware(error)
            } finally {
                setLoading(false);
            }
    }

    async function patch(_url, _body, { _config = {}, _headers = {} } = {}) {
        if (apiCallMiddleware(_url))
            try {
                setLoading(true);

                const response = await http.patch(`${baseUrl}${_url}`, _body, _config);

                if (response.status === 200 || (response.status === 201 && response.data.success)) return response.data;
            } catch (error) {
                // await errorMiddleware(error);
            } finally {
                setLoading(false);
            }
    }

    async function put(
        _url,
        _body,
        { _config = {}, _headers = {}, _params = {} } = {}
    ) {
        if (apiCallMiddleware(_url))
            try {
                const config = {
                    _config,
                    params: _params,
                };

                setLoading(true);

                const response = await http.put(`${baseUrl}${_url}`, _body, config);

                if (response.status === 200 || (response.status === 201 && response.data.success)) return response.data;
            } catch (error) {
                // await errorMiddleware(error)
            } finally {
                setLoading(false);
            }
    }

    async function del(_url) {
        try {
            setLoading(true);

            const response = await http.delete(`${baseUrl}${_url}`);

            if (response.status === 200 && response.data.success) return response.data;
        } catch (error) {
            // await errorMiddleware(error);
        } finally {
            setLoading(false);
        }
    }

    async function errorMiddleware(error) {

        // console.log(error);
        // if (error.status === 401) {
        //     // let coockieOptions = { path: "/" };
        //     // if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
        //     //     coockieOptions = { domain: "arz2arz.net" };

        //     // if (error.data?.expired && error.data?.redirectToLogin) {
        //     //     await removeCookie("accessToken", coockieOptions)
        //     //     await removeCookie("refreshToken", coockieOptions)

        //     //     await navigate(`/login`);
        //     // } else if (error.data?.redirectToRefresh) {
        //     //     if (!sessionStorage.getItem("unauth")) {
        //     //         sessionStorage.setItem("unauth", true)
        //     //         if (!error.config?.url.includes('renewAccessToken')) {
        //     //             try {
        //     //                 const res = await get(urls.RefreshToken);
        //     //                 console.log(res);
        //     //                 await setCookie("accessToken", res.access_token, coockieOptions);
        //     //                 setTimeout(() => {
        //     //                     sessionStorage.removeItem("unauth");
        //     //                 }, 3000);
        //     //             } catch (error) {

        //     //             }
        //     //         }
        //     //     }
        //     // }

        // } else if (!error.success) {
        //     throw error
        // }
    }

    return {
        loading,
        urls,
        baseUrl,
        get,
        post,
        patch,
        put,
        del,
    };
}
