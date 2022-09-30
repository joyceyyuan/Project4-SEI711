import tokenService from "./tokenService";

const BASE_URL = "/api/logs";

export function create(log) {
    return fetch(BASE_URL, {
        method: "POST",
        body: log,
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then(response => {
            console.log(response);
            throw new Error(response.err)
        })
    });
}

export function getAll() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    })
        .then((res) => {
            if (res.ok) return res.json();
            return res.json().then(response => {
                console.log(response)
                throw new Error(response.err)
            })
        });
}

export function deleteLog(logId) {
    return fetch(`${BASE_URL}/${logId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    })
}
