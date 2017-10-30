import axios from 'axios';
import  {urls} from '../constants/api-urls';

//all the api calls related to authentication are made here

// API call to authenticate the user and create session
export function authenticateUser(userName,password,DealerId,userType) {
let data={userName: userName, password:password};
//console.log("urls"+urls.authUrl);
  return axios.post(urls.authUrl+'?userType='+userType+'&DealerId='+DealerId,data)
    .then(response =>response.data);
}

//API call to change password 
export function changePassword(oldPassword,newpassword) {
let sessionID= localStorage.getItem('sessionID');
let data={oldPassword: oldPassword, oldPassword:oldPassword};
  return axios.post(urls.authUrl+'?sessionID='+sessionID,data)
    .then(response =>response.data);
}

//API call to delete user session
export function deleteSession() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.deleteSessionUrl+'?sessionID='+sessionID)
        .then(response => response.data);
}

//API call to get Dealer ID

export function getDealerId() {
    let sessionID= localStorage.getItem('sessionID');
    return axios.get(urls.getDealerIdUrl+'?sessionID='+sessionID)
        .then(response => response.data);
}