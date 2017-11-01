import axios from 'axios';
import  {urls} from '../constants/api-urls';
import Alert from 'react-s-alert';

//all the api calls related to authentication are made here

// API call to authenticate the user and create session
export function authenticateUser(userName,password,DealerId,userType) {
let data={userName: userName, password:password};
//console.log("urls"+urls.authUrl);
  return axios.post(urls.authUrl+'?userType='+userType+'&DealerId='+DealerId,data)
    .then(response =>response.data)
            //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in authenticateUser', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to change password 
export function changePassword(oldPassword,newpassword) {
let sessionID= localStorage.getItem('sessionID');
let data={oldPassword: oldPassword, newpassword:newpassword};
  return axios.post(urls.authUrl+'?sessionID='+sessionID,data)
    .then(response =>response.data)
            //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in changePassword', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to delete user session
export function deleteSession() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.deleteSessionUrl+'?sessionID='+sessionID)
        .then(response => response.data)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in deleteSession', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}

//API call to get Dealer ID

export function getDealers() {
    let sessionID= localStorage.getItem('sessionID');
    /**uncomment below code */
    //return axios.get(urls.getDealerIdUrl+'?sessionID='+sessionID)
    return axios.get(urls.getDealerIdUrl)
        .then(response => response.data)
                //exception handling in case of service is not reachable
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error in getDealers', error.message);
            }

            Alert.error('<h4>error occured while fetching the groups</h4>');

        });
}