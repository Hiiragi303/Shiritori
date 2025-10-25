import { ensureValidString } from "../utils/ensureValidString.js";
import { getTokenizer } from "./morphological.js";

export function toKatakana(text) {
    if (!ensureValidString(text, 'toKatakana')) return '';
    const tokenizer = getTokenizer();
    if (!tokenizer) {
        console.error("Tokenizerが初期化されていません");
        return '';
    }
    const tokens = tokenizer.tokenize(text);
    if (!Array.isArray(tokens)) {
        console.warn('tokenize結果が配列ではありません', tokens);
        return '';
    }

    const katakana = tokens.map(token => token.reading || token.surface_form).join("");

    return katakana;
}

/**
 * カタカナでユニコード正規化したもの
 * @param {string} text 生の文字列
 * @returns 正規化したカタカナ
 */
export function toNormalizedKatakana(text) {
    let katakana = toKatakana(text);
    if (!katakana) return '';
    const smallWordsMap = {
        ァ: "ア", ィ: "イ", ゥ: "ウ", ェ: "エ", ォ: "オ",
        ャ: "ヤ", ュ: "ユ", ョ: "ヨ", ッ: "ツ", ヮ: "ワ"
    };
    // 小文字を大文字化
    katakana = katakana.replace(/[ァィゥェォャュョッヮ]/g, c => smallWordsMap[c] || c);
    // 伸ばし棒削除
    katakana = katakana.replace(/ー/g, "");
    return katakana;
}