import { getAccessToken, getAccessTokenExpirationTime, getRefreshToken, saveTokens } from "./tokens";

export async function useFetch(method, data, useToken) {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (useToken) {
        const accessTokenExpirationTime = getAccessTokenExpirationTime();
        if (new Date() > accessTokenExpirationTime)
            refreshTokens();
        headers['User-Auth-Token'] = getAccessToken();
    };
    const response = await fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            params: data,
            id: 0
        })
    }).then(response => response.json());
    return response
};

async function refreshTokens() {
    const response = await fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'refreshTokens',
            params: { 'refreshToken': getRefreshToken() },
            id: 0
        })
    });
    saveTokens(response['result']['access_token'], response['result']['refresh_token']);
}

export function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}