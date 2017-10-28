export function logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sessionID');
    window.location.href='./';
}