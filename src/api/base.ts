import axios, { AxiosError } from 'axios';
import { WEB_API_URL_TEST } from '@env';
import { BaseError, ERROR_CODE } from './type';

const api = axios.create({
    baseURL: WEB_API_URL_TEST,
    timeout: 20000,
});
const changeEnv = (domain: string) => {
    api.defaults.baseURL = domain;
};

//handle truoc request
api.interceptors.request.use(async config => {
    return config;
});

//handle sau request
api.interceptors.response.use(
    async response => {
        //console.log(response);
        return response;
    },
    async axiosError => {
        return Promise.reject(axiosError);
    },
);

const buildErrorCode = (axiosError: any): BaseError => {
    let err = axiosError as AxiosError;
    console.info('Axios Error', err);
    let code = 0;
    let message = '';
    if (err.response?.status) {
        code = err.response.status;
        if (err.response?.data) {
            message = getErrorMessage(err.response.data);
        } else message = err.message;
    } else {
        message = err.message;
        if (message.includes('DOCTYPE html')) {
            message = 'Unknown error occurred';
        }
        if (err.message.includes('Network Error')) code = ERROR_CODE.NO_NETWORK;
        else if (err.message.includes('timeout')) code = ERROR_CODE.TIME_OUT;
        else if (err.message.includes('canceled')) code = ERROR_CODE.CANCELED;
    }
    return {
        error_code: code,
        error_msg: message,
    };
};

const getErrorMessage = (err: any) => {
    let errMsg = 'Unknown error';

    var message = err?.message;
    var messages = err?.messages;
    if (!!message) {
        if (Array.isArray(message) && message.length > 0) {
            errMsg = JSON.stringify(message[0]);
        } else if (typeof message == 'object') {
            var valueList = Object.values(message);
            if (valueList.length > 0) {
                errMsg = JSON.stringify(valueList[0]);
            }
        } else if (typeof message == 'string') {
            errMsg = message;
        }
    } else if (!!messages) {
        if (Array.isArray(messages) && messages.length > 0) {
            errMsg = messages[0]?.text || 'Unknown error';
        }
    } else errMsg = JSON.stringify(err);
    return errMsg.slice(0, 150);
};

export { changeEnv, getErrorMessage, buildErrorCode };

export default api;
