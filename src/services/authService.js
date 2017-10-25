import axios from 'axios';
import  {urls} from '../constants/api-urls';


export function authenticateUser(userName,password,DealerId,userType) {
let data={userName: userName, password:password};
//console.log("urls"+urls.authUrl);
  return axios.post(urls.authUrl+'?userType='+userType+'&DealerId='+DealerId,data)
    .then(response =>response.data);
}