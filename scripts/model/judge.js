import { isUsedWord, getLastWord } from './wordState.js';
import { getLastChar, getFirstChar } from './textManager.js';
import { ensureValidString } from '../utils/ensureValidString.js';
import { getTokenizer } from './morphological.js';
import { toNormalizedKatakana } from './textConverter.js';

/**
 * 
 * @param {string} word 
 * @returns 
 */
export function judgeWord(word) {
    // 型チェック、falsyチェック
    if (!ensureValidString(word, 'judgeWord')) return { ok: false, reason: '不適切な文字列です' };
    // 既出語チェック
    if (isUsedWord(word)) return { ok: false, reason: '既出語です' };
    // 接続チェック
    const connectionResult = isConnected(word);
    if (!connectionResult.ok) return connectionResult;
    // "ん"で終わるかチェック
    if (getLastChar(word) == 'ン') return { ok: false, reason: '\"ん\"で終わっています' };
    // 名詞チェック
    const nounResult = isNoun(word);
    if (!nounResult.ok) return nounResult;
    return { ok: true }
}

function isNoun(word) {
    // 型チェック, falsyチェック
    if (!ensureValidString(word, 'isNoun')) return { ok: false, reason: '不適切な文字列です' };
    const tokenizer = getTokenizer();
    if (!tokenizer) { return { ok: false, reason: 'Tokenizerが初期化されていません' }; }
    const tokens = tokenizer.tokenize(word);
    if (!Array.isArray(tokens)) {
        return { ok: false, reason: 'tokenize結果が配列ではありません' };
    }
    if (tokens[0].pos !== '名詞') {
        return { ok: false, reason: '名詞ではありません' };
    }
    return { ok: true };
}

function isConnected(word) {
    let prevLastChar = getLastChar(toNormalizedKatakana(getLastWord()));
    if (!prevLastChar || getFirstChar(word) !== prevLastChar) return { ok: false, reason: '接続が間違っています' };
    return { ok: true };
}