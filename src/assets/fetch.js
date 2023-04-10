export async function useFetch(method, data, headers = {}) {
    headers['Content-Type'] = 'application/json';
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
}