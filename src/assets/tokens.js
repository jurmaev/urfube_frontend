export function saveTokens(accessToken, refreshToken) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
}

export function getAccessToken() {
    return localStorage.getItem('access-token');
}

export function getRefreshToken() {
    return localStorage.getItem('refresh-token');
}

export function removeTokens() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
}