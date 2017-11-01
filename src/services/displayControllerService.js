import axios from 'axios';
import {urls} from '../constants/api-urls';
import Alert from 'react-s-alert';

//API call to get groups for right most 3 drop downs
export function getGroups() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getGroupsUrl)
        .then(response => response.data)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getGroups', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to get right drop downs to get file types
export function getFileTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFileTypesUrl)
        .then(response => response.data)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getFileTypes', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to get controller types from right bottom drop downs
export function getControllerTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getControllerTypesUrl)
        .then(response => response.data)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getControllerTypes', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to get firmware files
export function getFirmwareVersion(cgtName,controllerID) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFirmwareFilesUrl)
        .then(response => response.data)
      /**********uncomment below code when real time call is made**********/        
    // return axios.get(urls.getFirmwareFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='+controllerID+'&version='+'All')
    //     .then(response => response.data);
            //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getFirmwareVersion', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API to get support files
export function getSupportFile(cgtName,controllerID,controllerTypeID,supportFileType) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getSupportFilesUrl)
        .then(response => response.data)
    /**********uncomment below code when real time call is made**********/    
    // return axios.get(urls.getSupportFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='
    // +controllerID+'&controllerTypeID='+controllerTypeID+'&supportFileType='+supportFileType)
    //     .then(response => response.data);
        //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getSupportFile', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API to download files from DB
export function downloadFileFromDB(cgtName,fileID,fileType) {
    //&cgtName={cgtName}&fileID={fileID}&fileType={fileType}&startByte={startByte}&numBytes={numBytes}
    let sessionID= localStorage.getItem('sessionID');
    return fetch(urls.downloadFileFromDBUrl+'?sessionID='+sessionID+'&cgtName='+cgtName+'&fileID='+fileID+'&fileType='+fileType)
        .then(response => response)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in downloadFileFromDB', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}


//download the file from system
export function downloadFileFromSystem() {
    let sessionID= localStorage.getItem('sessionID');
    return fetch(urls.downloadFileFromSystemUrl+'?sessionID='+sessionID)
        .then(response => response)
        //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in downloadFileFromSystem', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}
