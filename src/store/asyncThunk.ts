import { Dispatch, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

import { ERROR_CODE, BaseError } from '@api/type';
import api, { getErrorMessage } from '@api/base';
import { createSignal, removeSignal } from '@api/abortController';
import { SERVICE_DEBUG } from '@api/debug';

/**
 * Service không cần check status = 200
 */
const EXCEPTION = ['auth/login'];

type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state: RootState;
    /** type for `thunkApi.dispatch` */
    dispatch?: Dispatch;
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown;
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue: BaseError;
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown;
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown;
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown;
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown;
};

type BaseResponse = {
    [x: string]: any;
    status: number;
    msg: string | null;
};

/**
 *  Arg type for createPostThunk
 */
type PostData<TParam, TBody> = {
    params?: TParam;
    body?: TBody;
};

/**
 * Async thunk for GET request
 * @param type Action name of this thunk
 * @param url The suffix url of the request
 * @param transformResponse Selector of BaseResponse, only retrieve some useful value
 * @param header Additional header for the request
 * @returns
 */
const createGetThunk = <Params, Response = unknown>(
    type: string,
    url: string,
    transformResponse: (res: BaseResponse) => Response = res => res as Response,
    header: { [x: string]: any } = {},
) => {
    return createAsyncThunk<Response, Params, AsyncThunkConfig>(type, async (params, { getState, rejectWithValue }) => {
        const token = getState().auth.accessToken;
        const headers = { ...header, ...(!!token && { Authorization: token }) };

        const signal_name = `${type}_${Date.now}`;
        const signal = createSignal(signal_name);
        thunkLogger(type, {
            url: `${api.defaults.baseURL}${url}`,
            ...(!!params && { params }),
            headers,
        });
        try {
            const res = await api.get<BaseResponse>(url, { ...(!!params && { params }), headers, signal });
            thunkLogger(type, res, 'response');
            removeSignal(signal_name);
            if (EXCEPTION.includes(type) || res.data.status == 200) {
                return transformResponse(res.data);
            }
            return rejectWithValue({
                error_code: ERROR_CODE.SERVER_ERR,
                error_msg: res.data.msg ?? 'Unknown error',
            });
        } catch (e) {
            console.log('Error happened', e);
            var error = e as BaseError;
            thunkLogger(type, error, 'error');
            removeSignal(signal_name);
            return rejectWithValue(error);
        }
    });
};

/**
 * Async thunk for POST request
 * @param type Action name of this thunk
 * @param url The suffix url of the request
 * @param transformResponse Selector of BaseResponse, only retrieve some useful value
 * @param header Additional header for the request
 * @returns
 */
const createPostThunk = <TParam, TBody, Response = unknown>(
    type: string,
    url: string,
    transformResponse: (res: BaseResponse) => Response = res => res as Response,
    header: { [x: string]: any } = {},
) => {
    return createAsyncThunk<Response, PostData<TParam, TBody>, AsyncThunkConfig>(
        type,
        async (postData, { getState, rejectWithValue }) => {
            const { params, body } = postData;
            const token = getState().auth.accessToken;
            const headers = { ...header, ...(!!token && { Authorization: token }) };

            const signal_name = `${type}_${Date.now}`;
            const signal = createSignal(signal_name);
            thunkLogger(type, {
                url: `${api.defaults.baseURL}${url}`,
                ...(!!params && { params }),
                headers,
                body,
            });

            try {
                const res = await api.post<BaseResponse>(url, body, { ...(!!params && { params }), headers, signal });
                thunkLogger(type, res, 'response');
                removeSignal(signal_name);
                if (EXCEPTION.includes(type) || res.data.status == 200) {
                    return transformResponse(res.data);
                }
                return rejectWithValue({
                    error_code: ERROR_CODE.SERVER_ERR,
                    error_msg: res.data.msg ?? 'Unknown error',
                });
            } catch (e) {
                var error = e as BaseError;
                thunkLogger(type, error, 'error');
                removeSignal(signal_name);
                return rejectWithValue(error);
            }
        },
    );
};

/**
 * Only logging if action name is specified in SERVICE_DEBUG array
 * @param action_name
 * @param log
 * @param type
 */
const thunkLogger = (action_name: string, log: any, type: 'request' | 'response' | 'error' = 'request') => {
    if (SERVICE_DEBUG.length == 0 || !!SERVICE_DEBUG.find(item => action_name.includes(item))) {
        console.group(`${type.toUpperCase()}:`, action_name);
        console.log(log);
        console.groupEnd();
        //other logging 3rd party go here
    }
};

export { createPostThunk, createGetThunk };
