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
    return axios.get(urls.getFirmwareFilesUrl)
        .then(response => response.data);
      /**********uncomment below code when real time call is made**********/        
    // return axios.get(urls.getFirmwareFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='+controllerID+'&version='+'All')
    //     .then(response => response.data);
}

export function getSupportFile(cgtName,controllerID,controllerTypeID,supportFileType) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getSupportFilesUrl)
        .then(response => response.data);
    /**********uncomment below code when real time call is made**********/    
    // return axios.get(urls.getSupportFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='
    // +controllerID+'&controllerTypeID='+controllerTypeID+'&supportFileType='+supportFileType)
    //     .then(response => response.data);
}


export function downloadFileFromDB(cgtName,fileID,fileType) {
    //&cgtName={cgtName}&fileID={fileID}&fileType={fileType}&startByte={startByte}&numBytes={numBytes}
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.downloadFileFromDBUrl+'?sessionID='+sessionID+'&cgtName='+cgtName+'&fileID='+fileID+'&fileType='+fileType)
        .then(response => response.data);
}

export function downloadFileFromSystem() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.downloadFileFromSystemUrl+'?sessionID='+sessionID)
        .then(response => response.data);
}