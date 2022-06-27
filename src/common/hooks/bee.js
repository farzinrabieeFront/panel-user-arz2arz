import axios from 'axios';
import config from '../../configuration.json';
import qs from 'qs';

const baseURL = config['baseUrl_local'];
let authTokenRequest;

const client = axios.create({
    baseURL: baseURL,
    headers: {
        appID: 8,
        version: "1.1.0",
        empID: localStorage.getItem('empID'),
        token: localStorage.getItem('accessToken')
    }
});

client.interceptors.response.use(undefined, err => {
    const error = err.response;
    // if error is 401 
    if (error.status === 401 && error.config &&
        !error.config.__isRetryRequest) {
        // request for a new token
        return getAuthToken().then(response => {
            // update the error config with new token
            error.config.__isRetryRequest = true;
            error.config.headers.token = localStorage.getItem("accessToken");
            return client(error.config);
        });
    }
});

function getAuthToken() {
    if (!authTokenRequest) {
        authTokenRequest = requestNewToken();
        authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
    }
    return authTokenRequest;
}

const request = function (options) {
    const onSuccess = function (response) {
        return response.data;
    }
    const onError = function (error) {
        //console.error('Request Failed:', error.config);
        if (error.response) {
            //console.error('Status:',  error.response.status);
            //console.error('Data:',    error.response.data);
            //console.error('Headers:', error.response.headers);
        } else {
            console.error('Error Message:', error.message);
        }
        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
    options
}

function requestNewToken() {
    var newToken = request({
        method: "post",
        url: '/sign-in',
        data: qs.stringify({
            "userName": localStorage.getItem('userName'),
            "password": localStorage.getItem('password')
        })
    }).then((res) => {
        if (res.status == "success") {
            localStorage.setItem('accessToken', res.data.accessToken);
            //if featureArray is present in response object, update the 
            featureArray in localstorage
            if (res.data.features) {
                localStorage.setItem(
                    'featureArray',
                    JSON.stringify(res.data.features));
            }
            client = axios.create({
                baseURL: baseURL,
                headers: {
                    appID: 8,
                    version: "1.1.0",
                    empID: localStorage.getItem('empID'),
                    token: localStorage.getItem('accessToken')
                }
            });
        } else {
            window.location = "/logout";
        }
    });
    return newToken;
}

function resetAuthTokenRequest() {
    authTokenRequest = null;
}



export default request;







// import axios from 'axios';
// import config from '../../configuration.json';
// import qs from 'qs';

// const baseURL = config['baseUrl_local'];
// let authTokenRequest;

// /**
//   * @description axios instance for ajax requests
// */

// var client = axios.create({
//     baseURL: baseURL,
//     headers: {
//         appID: 8,
//         version: "1.1.0",
//         empID: localStorage.getItem('empID'),
//         token: localStorage.getItem('accessToken')
//     }
// });

// /**
//  * @description this method calls a requestNewToken method to issue a
//  new token to the client
// */

// function getAuthToken() {
//     if (!authTokenRequest) {
//         authTokenRequest = requestNewToken();
//         authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
//     }
//     return authTokenRequest;
// }

// /**
//   * @description this method requests the server to issue a new token,
//   the server response is updated in local storage accessToken
// */

// function requestNewToken() {
//     var newToken = request({
//         method: "post",
//         url: '/sign-in',
//         data: qs.stringify({
//             "userName": localStorage.getItem('userName'),
//             "password": localStorage.getItem('password')
//         })
//     }).then((res) => {
//         if (res.status == "success") {
//             localStorage.setItem('accessToken', res.data.accessToken);
//             //if featureArray is present in response object, update the
//             featureArray in localstorage
//             if (res.data.features) {
//                 localStorage.setItem(
//                     'featureArray',
//                     JSON.stringify(res.data.features));
//             }
//             client = axios.create({
//                 baseURL: baseURL,
//                 headers: {
//                     appID: 8,
//                     version: "1.1.0",
//                     empID: localStorage.getItem('empID'),
//                     token: localStorage.getItem('accessToken')
//                 }
//             });
//         } else {
//             window.location = "/logout";
//         }
//     });
//     return newToken;
// }

// function resetAuthTokenRequest() {
//     authTokenRequest = null;
// }

// /**
//   * @description if any of the API gets 401 status code, this method
//    calls getAuthToken method to renew accessToken
//   * updates the error configuration and retries all failed requests
//   again
// */

// client.interceptors.response.use(undefined, err => {
//     const error = err.response;
//     // if error is 401
//     if (error.status === 401 && error.config &&
//         !error.config.__isRetryRequest) {
//         // request for a new token
//         return getAuthToken().then(response => {
//             // update the error config with new token
//             error.config.__isRetryRequest = true;
//             error.config.headers.token = localStorage.getItem("accessToken");
//             return client(error.config);
//         });
//     }
// });

// /**
//  * @description wrapper for making ajax requests
//  * @param {object} object with method,url,data etc.
// */

// const request = function (options) {
//     const onSuccess = function (response) {
//         return response.data;
//     }
//     const onError = function (error) {
//         //console.error('Request Failed:', error.config);
//         if (error.response) {
//             //console.error('Status:',  error.response.status);
//             //console.error('Data:',    error.response.data);
//             //console.error('Headers:', error.response.headers);
//         } else {
//             console.error('Error Message:', error.message);
//         }
//         return Promise.reject(error.response || error.message);
//     }

//     return client(options)
//         .then(onSuccess)
//         .catch(onError);
//     options
// }

// export default request;
