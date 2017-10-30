import axios from 'axios';
import {urls} from '../constants/api-urls';

//API call to get groups for right most 3 drop downs
export function getGroups() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getGroupsUrl)
        .then(response => response.data);
}

//API call to get right drop downs to get file types
export function getFileTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFileTypesUrl)
        .then(response => response.data);
}

//API call to get controller types from right bottom drop downs
export function getControllerTypes() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getControllerTypesUrl)
        .then(response => response.data);
}

//API call to get firmware files
export function getFirmwareVersion(cgtName,controllerID) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getFirmwareFilesUrl)
        .then(response => response.data);
      /**********uncomment below code when real time call is made**********/        
    // return axios.get(urls.getFirmwareFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='+controllerID+'&version='+'All')
    //     .then(response => response.data);
}

//API to get support files
export function getSupportFile(cgtName,controllerID,controllerTypeID,supportFileType) {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getSupportFilesUrl)
        .then(response => response.data);
    /**********uncomment below code when real time call is made**********/    
    // return axios.get(urls.getSupportFilesUrl+'?sessionID'+sessionID+'&cgtName='+cgtName+'&controllerID='
    // +controllerID+'&controllerTypeID='+controllerTypeID+'&supportFileType='+supportFileType)
    //     .then(response => response.data);
}

//API to download files from DB
export function downloadFileFromDB(cgtName,fileID,fileType) {
    //&cgtName={cgtName}&fileID={fileID}&fileType={fileType}&startByte={startByte}&numBytes={numBytes}
    let sessionID= localStorage.getItem('sessionID');
    return fetch(urls.downloadFileFromDBUrl+'?sessionID='+sessionID+'&cgtName='+cgtName+'&fileID='+fileID+'&fileType='+fileType)
        .then(response => 
        {   //download the file in chunks
            this.downloadFile(response);
        });
}




//read file chunk by chunk using javascript

function downloadFile(response){
 // response.body is a readable stream.
  // Calling getReader() gives us exclusive access to
  // the stream's content
  var reader = response.body.getReader();
  var bytesReceived = 0;

  // read() returns a promise that resolves
  // when a value has been received
  return reader.read().then(function processResult(result) {
    // Result objects contain two properties:
    // done  - true if the stream has already given
    //         you all its data.
    // value - some data. Always undefined when
    //         done is true.
    if (result.done) {
      console.log("Fetch completed");
      return;
    }

    // result.value for fetch streams is a Uint8Array
    bytesReceived += result.value.length;
    console.log('Received', bytesReceived, 'bytes of data so far');
    // Read some more, and call this function again
    return reader.read().then(processResult);
  });

}

export function cacelDownload(){


}


//download the file from system
export function downloadFileFromSystem() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.downloadFileFromSystemUrl+'?sessionID='+sessionID)
        .then(response => response.data);
}