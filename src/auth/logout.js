import * as authService from '../services/authService';
export function logout() {
    authService.deleteSession().then(response => {
            // localStorage.removeItem('isLoggedIn'); localStorage.removeItem('sessionID');
            // window.location.href='./';
        });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionID');
    window.location.href = './';
}