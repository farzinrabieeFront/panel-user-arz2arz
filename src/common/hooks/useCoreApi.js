import React, { useEffect, useState } from "react";
import * as urls from "../constants/urls";
import axios from "../../services/Http";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const coreUrl =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://194.5.192.82:8088/v1/orders"
        : "https://core.arz2arz.net/v1/orders";

export default function useCoreApi() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);


    function apiCallMiddleware(_url) {
        if (urls.PublicApis.includes(_url)) return true
        else {
            if (cookies.accessToken && cookies.refreshToken) return true
            else return false
        }
    }

    // async function get(_url, { _config = {}, _headers = {}, _params = {} } = {}) {
    //     if (apiCallMiddleware(_url))
    //         try {
    //             const config = {
    //                 _config,
    //                 params: _params
    //             }
    //             setLoading(true);

    //             const response = await axios.get(`${baseUrl}${_url}`, config);
    //             const { data, status } = response;

    //             if (status === 200 && (data.success || typeof data === 'string')) return data;
    //         } catch (error) {
    //             errorMiddleware(error)
    //             // if (!error.success) throw error;
    //         } finally {
    //             setLoading(false);
    //         }
    // };

    async function post(
        _url,
        _body,
        { _config = {}, _headers = {} } = {}
    ) {
        if (apiCallMiddleware(_url))
            try {
                setLoading(true);

                const response = await axios.post(`${coreUrl}${_url}`, _body, _config);
                const { data, status } = response;

                if (status === 200 || (status === 201 && data.success) || status === 202) return data;
            } catch (error) {
                errorMiddleware(error)

                // if (!error.success) throw error;
            } finally {
                setLoading(false);
            }
    };

    // async function patch(
    //     _url,
    //     _body,
    //     { _config = {}, _headers = {} } = {}
    // ) {
    //     if (apiCallMiddleware(_url))
    //         try {
    //             setLoading(true);

    //             const response = await axios.patch(`${baseUrl}${_url}`, _body, _config);
    //             const { data, status } = response;

    //             if (status === 200 || (status === 201 && data.success)) return data;
    //         } catch (error) {
    //             errorMiddleware(error)

    //             // if (!error.success) throw error;
    //         } finally {
    //             setLoading(false);
    //         }
    // };

    // async function del(_url) {
    //     try {
    //         setLoading(true);

    //         const response = await axios.delete(`${baseUrl}${_url}`);
    //         const { data, status } = response;

    //         if (status === 200 && data.success) return data;
    //     } catch (error) {
    //         errorMiddleware(error)

    //         // if (!error.success) throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    async function errorMiddleware(error) {
        if (error.status === 401) {
            let coockieOptions = { path: '/' }
            if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
                coockieOptions = { domain: 'arz2arz.net' }

            if (error.data.redirectToRefresh) {
                // try {
                //     const { access_token } = get(urls.RefreshToken)

                //     setCookie("accessToken", access_token, coockieOptions);
                // } catch (error) {
                //     console.log(error);
                // }
            } else if (error.data.redirectToLogin) {
                await removeCookie('accessToken', { path: "/" });
                await removeCookie('refreshToken', { path: "/" });

                await navigate(`/login`);
            }
        } else if (!error.success) throw error;
    }

    return {
        loading,
        urls,
        // get,
        post,
        // patch,
        // del
    };
}