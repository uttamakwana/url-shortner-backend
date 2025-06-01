import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, TOO_MANY_REQUESTS, UNAUTHORIZED, UNPROCESSABLE_CONTENT } from "../constants";

export type THttpStatusCode =
    | typeof OK
    | typeof CREATED
    | typeof BAD_REQUEST
    | typeof UNAUTHORIZED
    | typeof FORBIDDEN
    | typeof NOT_FOUND
    | typeof CONFLICT
    | typeof UNPROCESSABLE_CONTENT
    | typeof TOO_MANY_REQUESTS
    | typeof INTERNAL_SERVER_ERROR;

export type TTokenType = "accessToken" | "refreshToken";