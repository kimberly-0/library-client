import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_URL}
});

export function makeRequest(url, options) {
    return api(url, options)
        .then(res => {
            return res.data
        })
        .catch(error => {
            console.log("Error : " + JSON.stringify(error?.response?.data))
            return Promise.reject(error?.response?.data ?? "Error")
        })
}