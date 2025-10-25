export function ensureValidString(value, funcName = '') {
    if (typeof value !== 'string' || !value) {
        console.warn(`${funcName}: 無効な入力`, value);
        return false;
    }
    return true;
}