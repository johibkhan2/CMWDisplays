import * as authService from '../services/authService';

//logout function when click on exit or when user has not accessed application to 220 minutes
export function logout() {
    authService.deleteSession().then(response => {
        /**uncomment below code when replacing with realtime code */
            // localStorage.removeItem('isLoggedIn'); localStorage.removeItem('sessionID');
            // window.location.href='./';
        });
          /**comment below code when replacing with realtime code */
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionID');
    window.location.href = './';
}