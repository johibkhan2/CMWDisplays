import {logout} from '../auth/logout';

const timeInterval = 13200000;
//const timeInterval = 60000;

var timeout;

export function setTimeOutNow() {
    console.log("setTimeOutNow called");    
    timeout= window.setTimeout(function(){ logout() }, timeInterval);
}    


export function resetTimeoutNow() {
    console.log("resetTimeoutNow called");  
    window.clearTimeout(timeout);
    setTimeOutNow();
}