import axios from 'axios';
import {urls} from '../constants/api-urls';

export function getGroups() {
    return axios.get(urls.getGroupsUrl)
        .then(response => response.data);
}

export function getFiles() {
    return axios.get(urls.getFilesUrl)
        .then(response => response.data);
}

export function getFileTypes() {
    return axios.get(urls.getFileTypesUrl)
        .then(response => response.data);
}

export function getControllerTypes() {
    return axios.get(urls.getControllerTypesUrl)
        .then(response => response.data);
}