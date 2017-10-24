import axios from 'axios';
import  {urls} from '../constants/api-urls';


export function authenticateUser(data) {
console.log("urls"+urls.authUrl);
  return axios.post('',data)
    .then(response =>response.data)
    .catch(function (error) {
 /*      // console.log(error);*/
        if (error.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
      return error;
    });

}