import axios from "./axios";
export const getMenu = (param) => {
    return axios.request({
        url: "/permission/getMenu",
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very')}
    })
}

export const getGroupList = () => {
    return axios.request({
        url: '/groups/getGroupList',
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const getGroup = () => {
    return axios.request({
        url: '/groups/getGroup',
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}


export const getData = () => {
    return axios.request({
        url: '/home/getData',
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const createItem = (param) => {
    return axios.request({
        url: '/warehouse/createItem',
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const updateItem = (param) => {
    return axios.request({
        url: '/warehouse/updateItem',
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const deleteItem = (param) => {
    return axios.request({
        url: '/warehouse/deleteItem',
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const stockInItem = (param) => {
    return axios.request({
        url: '/warehouse/stock-in',
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}

export const stockOutItem = (param) => {
    return axios.request({
        url: '/warehouse/stock-out',
        method: "post",
        data: param,
        headers: { 'Authorization': localStorage.getItem('very') }
    })
}