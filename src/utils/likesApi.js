import tokenService from "./tokenService";
// import the tokenService so we can get the jwt to send
// over in our requests

const BASE_URL = "/api/";

export function createLike(logId) {
    return fetch(`${BASE_URL}logs/${logId}/likes`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
            // local storage and send its in the header to the server
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}

export function removeLike(likeId) {
    return fetch(`${BASE_URL}likes/${likeId}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
            // local storage and send its in the header to the server
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    });
}