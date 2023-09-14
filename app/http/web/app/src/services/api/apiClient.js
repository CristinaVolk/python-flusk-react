import axios from 'axios';

import {BASE_API_URL} from "./consts";

const client = axios.create({
 baseURL: BASE_API_URL,
 json: true
});

export class APIClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }
    createKudo(repo) {
        return this.perform('post', '/kudos', repo);
    }

    deleteKudo(repo) {
        return this.perform('delete', `/kudos/${repo.id}`);
    }

    getKudos() {
        return this.perform('get', '/kudos');
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }).then(resp => {
            return resp.data ? resp.data : [];
        })
    }
}