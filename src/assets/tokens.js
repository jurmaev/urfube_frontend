import { addMinutes } from '../assets/fetch';

export function saveTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenExpirationTime', addMinutes(new Date(), 30));
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('refreshTokenExpirationTime', addMinutes(new Date(), 10080));
}

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function getAccessTokenExpirationTime() {
    return localStorage.getItem('accessTokenExpirationTime');
}

export function getRefreshTokenExpirationTime() {
    return localStorage.getItem('refreshTokenExpirationTime');
}

export function removeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpirationTime');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpirationTime');
}