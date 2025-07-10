

import axios from "axios";

export const uploads = async (url, data) => {

    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        throw error;
    }
}
export const create = async (url, data) => {

    try {
        const response = await axios.post(url, data, {
            headers: { "Content-Type": 'application/json' },
            timeout: 80000,
            withCredentials: true,
        });
        return response;
    } catch (error) {
        throw error;// Throwing the error to handle it where the function is called
    }
}

export const getAll = async (url) => {

    try {
        const response = await axios.get(url,{
            withCredentials : true
        });
        return response;
    } catch (error) {
        throw error;// Throwing the error to handle it where the function is called
    }
}

export const deletes = async (url) => {
    try {
        const response = await axios.delete(url,{
            withCredentials : true
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const get = async (url) => {
    try {
        const response = await axios.get(url, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const replace = async (url, data) => {
    if (data.category === '' || data.subcategory === '') {
        throw 'error';
    }
    try {
        const response = await axios.put(url, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const update = async (url, data) => {
    try {
        const response = await axios.patch(url, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error;
    }
}