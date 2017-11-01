//procession session such as sessionID and isLoggedIn
export function processSession(response) {
    localStorage.setItem('isLoggedIn', response.IsLoggedIn); //IsLoggedIn
    localStorage.setItem('sessionID', response.SessionID); //SessionID
}