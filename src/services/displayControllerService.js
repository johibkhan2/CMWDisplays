import axios from 'axios';
import {urls} from '../constants/api-urls';

export function getGroups() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getGroupsUrl)
        .then(response => response.data);
}

export function getFiles() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFilesUrl)
        .then(response => response.data);
}

export function getFileTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFileTypesUrl)
        .then(response => response.data);
}

export function getControllerTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getControllerTypesUrl)
        .then(response => response.data);
}