import {logout} from '../auth/logout';

const timeInterval = 13200000;
//const timeInterval = 10000;

var timeout;

export function setTimeOutNow() {
    console.log("setTimeOutNow called");    
    timeout= setInterval(function(){ logout() }, timeInterval);
}    


export function resetTimeoutNow() {
    console.log("resetTimeoutNow called");  
    clearInterval(timeout);
    this.setTimeOutNow();
}