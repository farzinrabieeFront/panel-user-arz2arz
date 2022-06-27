import axios from 'axios';
import TokenService from './tokenService';

class Request {
    url = 'http://194.5.192.82:4000/api/v1/customer'
    constructor() {
        this.isRefreshing = false;
        this.failedRequests = [];
        this.tokenService = new TokenService();
        this.client = axios.create({
            baseURL: this.url,
        });
        this.beforeRequest = this.beforeRequest.bind(this);
        this.onRequestFailure = this.onRequestFailure.bind(this);
        this.processQueue = this.processQueue.bind(this);
        this.client.interceptors.request.use(this.beforeRequest);
        this.client.interceptors.response.use(this.onRequestSuccess,
            this.onRequestFailure);
        // console.log(Object.keys(this.client));
    }

    beforeRequest(request) {
        const _access_token = this.tokenService.getAccessToken()
        const _refresh_token = this.tokenService.getRefreshToken()

        const isAuth = _access_token && _refresh_token

        if (isAuth) {
            request.headers.access_token = _access_token;
        }

        return request;
    }

    static onRequestSuccess(response) {
        return response.data;
    }

    async onRequestFailure(err) {
        const { response } = err;
        if (response.status === 401 && err && err.config && !err.config.__isRetryRequest) {
            console.log(response.data.redirectToRefresh);
            if (response.data.redirectToRefresh) {
                if (this.isRefreshing) {
                    try {

                        const token = await new Promise((resolve, reject) => {
                            this.failedRequests.push({ resolve, reject });
                        });

                        console.log({ token });
                        err.config.headers.access_token = token;
                        return this.client(err.config);
                    } catch (e) {
                        console.log(e);
                        return e;
                    }
                }
                this.isRefreshing = true;
                err.config.__isRetryRequest = true;

                try {
                    const res = await this.tokenService.refreshAccessToken()
                    this.tokenService.changeAccessToken(res.data.access_token)
                    err.config.headers.Authorization = res.data.access_token;
                    this.isRefreshing = false;
                    this.processQueue(null, res.data.access_token);
                    return this.client(err.config);
                } catch (e) {
                    this.processQueue(e, null);
                    this.tokenService.removeTokens()
                }
            } else {
                this.tokenService.removeTokens()
            }
        }
        throw response;
    }

    async processQueue(error, token = null) {
        this.failedRequests.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        this.failedRequests = [];
    }
}


const request = new Request();

export default request.client;