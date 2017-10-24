export function isRequired(val) {
    let value = val.trim();
    if (value == '' || value == null) {
        return false;
    } else {
        return true;
    }
}