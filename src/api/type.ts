export interface BaseError {
    error_code: ERROR_CODE;
    error_msg: string;
}

export enum ERROR_CODE {
    NO_NETWORK = -1,
    TIME_OUT = -2,
    SERVER_ERR = -3,
    CANCELED = -4,
}
