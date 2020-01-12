import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getAlbuns() {
    return request({
        url: API_BASE_URL + "/facebook/albums",
        method: 'GET'
    });
}

export function getMoreAlbuns(facebookId, navegationId, direction) {
    return request({
        url: API_BASE_URL + "/facebook/albums/" + facebookId + "?" + direction + "=" + navegationId,
        method: 'GET'
    });
}

export function getPhotos(albumId) {
    return request({
        url: API_BASE_URL + "/facebook/album/" + albumId + "/photos",
        method: 'GET'
    });
}

export function getMorePhotos(albumId, navegationId, direction) {
    return request({
        url: API_BASE_URL + "/facebook/album/" + albumId + "/photos?" + direction + "=" + navegationId,
        method: 'GET'
    });
}

