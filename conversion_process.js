import { Result, inMemo } from "./textManager.js";

const DICT_PATH = "./dict";
const CSV_PATH = "./norn_dict";
let tokenizer = null;
let dict = null;

// 字句解析(tokenizer)の初期化
export async function initTokenizer() {
    if (tokenizer) return;

    tokenizer = await new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: DICT_PATH}).build(function (err, tokenizer) {
            if (err) reject(err);
            else resolve(tokenizer);
        });
    });
}

// 名詞辞書の用意
export async function loadNornDict() {
    if (dict) return;

    const response = await fetch(CSV_PATH + "/Noun.csv");
    if (!response.ok) throw new Error("csvファイルの読み込み失敗");

    const csv_text = await response.text();

    dict = [];
    const lines = csv_text.split("\n");

    for (let line of lines) {
        const cols = line.split(",");
        if (cols.length > 0 && cols[0].trim() != "") {
            dict.push(cols[0]);
        }
    }
    console.log("ファイルの準備完了");
    // console.log(dict);
}

// テキストをカタカナへ変換する
export function convertToKatakana(text) {
    if (!tokenizer) {
        console.error("tokenizerが初期化されていません。");
        return "";
    }

    const tokens = tokenizer.tokenize(text);
    return tokens.map(token => token.reading || token.surface_form).join("");
}

// 辞書から単語を探す
export function decideWord(startChar) {
    if (!tokenizer) {
        console.error("tokenizerが初期化されていません。");
        return Result.GAME_OVER;
    } else if (!dict) {
        console.error("dictが初期化されていません。");
        return Result.GAME_OVER;
    }
    const words = [];
    dict.forEach(word => {
        if (!word) return;

        const tokens = tokenizer.tokenize(word);
        const token = tokens[0];
        if (!token.pos || !token.reading) return;
        if (token.pos == "名詞" && token.reading.startsWith(startChar) && !token.reading.endsWith("ン") && !inMemo(token.reading)) {
        //    console.log(token.reading);
            words.push(token.reading);
        };
    });
    console.log(words);
    return words[Math.floor(Math.random() * words.length)];
}