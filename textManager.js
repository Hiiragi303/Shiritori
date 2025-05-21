let preText = "シリトリ";
let text = null;
const memo = ["シリトリ"];
const history = [];
const forbiddenChar = "ン";

export const Result = {
    SUCCESSS: "SUCCESS",
    RETRY: "RETRY",
    GAMVE_OVER: "GAMVE_OVER"
};

export function setText(input) {
    text = input;
}

export function getLastCharOfPreText() {
    return lastChar(preText);
}

export function lastChar(_text) {
    if (!_text) return undefined;
    return _text[_text.length - 1];
}

export function check() {
    if (!text || !preText) return Result.RETRY;
    if (text.endsWith(forbiddenChar)) return Result.GAMVE_OVER;
    const isValid = text.startsWith(lastChar(preText)) && !inMemo(text);
    if (!isValid) return Result.RETRY;
    return Result.SUCCESSS;
}

export function inMemo(_text) {
    return memo.includes(_text);
}

export function update() {
    memo.push(text);
    history.push([preText,text]);
    preText = text;
    text = null;
    console.log("アップデート完了");
    console.log(history);
}