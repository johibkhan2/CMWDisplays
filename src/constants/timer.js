import {logout} from '../auth/logout';

//global timer for app
const timeInterval = 13200000;
//const timeInterval = 60000;

var timeout;

//setting time out
export function setTimeOutNow() {
    console.log("setTimeOutNow called");    
    timeout= window.setTimeout(function(){ logout() }, timeInterval);
}    

//restting time out
export function resetTimeoutNow() {
    console.log("resetTimeoutNow called");  
    window.clearTimeout(timeout);
    setTimeOutNow();
}