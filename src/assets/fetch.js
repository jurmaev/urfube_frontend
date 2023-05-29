import { getAccessToken, getAccessTokenExpirationTime, getRefreshToken, saveTokens } from "./tokens";
import { BACKEND_BASE_DOMAIN } from "../main";
export async function useFetch(method, data, useToken) {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if (useToken) {
        const accessTokenExpirationTime = Date.parse(getAccessTokenExpirationTime());
        if (new Date() > accessTokenExpirationTime)
            await refreshTokens();
        headers['User-Auth-Token'] = getAccessToken();
    };
    const response = await fetch(`${BACKEND_BASE_DOMAIN}/api`, {
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
    const response = await fetch(`${BACKEND_BASE_DOMAIN}/api`, {
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