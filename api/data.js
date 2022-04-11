import axios from "./axios";
let headers = {};

/**
 * 
 * @param {string} h : header{key: value} 
 */
export const setHeader = (h) => {
    headers = h;
}

export const getMenu = (param) => {
    return axios.request({
        url: "/permission/getMenu",
        method: "post",
        data: param,
        headers
    })  
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}