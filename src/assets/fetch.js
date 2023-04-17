import { getAccessToken, getAccessTokenExpirationTime, getRefreshToken, saveTokens } from "./tokens";

export async function useFetch(method, data, useToken) {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (useToken) {
        const accessTokenExpirationTime = Date.parse(getAccessTokenExpirationTime());
        if (new Date() > accessTokenExpirationTime)
            await refreshTokens();
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

export async function refreshTokens() {
    const response = await fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'refresh_tokens',
            params: { 'refresh_token': getRefreshToken() },
            id: 0
        })
    }).then(response => response.json());
    saveTokens(response['result']['access_token'], response['result']['refresh_token']);
}

export function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}