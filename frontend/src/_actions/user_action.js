import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';
import { USER_SERVER } from '../components/Config';

export function loginUser(dataToSubmit) {
    const request = axios
        .post('/api/users/login', dataToSubmit)
        .then((res) => res.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = axios
        .post('api/users/register', dataToSubmit)
        .then((res) => res.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios
        .get(`${USER_SERVER}/auth`)
        .then((res) => res.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}
