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

//API based on back end logic
export function getFirmwareVersion(cgtName,controllerID) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='+controllerID+'&version='+'All')
        .then(response => response.data);
}

export function getSupportFile(cgtName,controllerID,controllerTypeID,supportFileType) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='
    +controllerID+'&controllerTypeID='+controllerTypeID+'&supportFileType='+supportFileType)
        .then(response => response.data);
}