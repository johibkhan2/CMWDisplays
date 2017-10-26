export function isRequired(val) {
    let value = val.trim();
    if (value == '' || value == null) {
        return false;
    } else {
        return true;
    }
}


export function getPasswordScore(val) {
    let score = 1;
    let value = val.trim();
    if(value.length >= 7) {
        score++;
    } if(value.length >= 12) {
        score++;
    } if(atLeastNumber(value)) {
        score++;
    } if(atLeastSpecChar(value)) {
        score++;
    } if(atLeastUpperChar(value)) {
        score++;
    }
    return score;
}


export function atLeastNumber(val) {
if(val.match(/\d+/))
    return true;
 return false;
}

export function atLeastSpecChar(val) {
if(val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,),'\s']/)) 
    return true;
 return false;
}

export function atLeastUpperChar(val) {
if(val.match(/[A-Z]/) && val.match(/[a-z]/)) 
    return true;
 return false;
}



