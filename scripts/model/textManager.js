import { toKatakana } from './textConverter.js';
import { ensureValidString } from '../utils/ensureValidString.js';

export function getFirstChar(text) {
    const katakana = toKatakana(text);
    if (!ensureValidString(katakana, 'getFirstChar')) return '';
    return katakana[0]
}

export function getLastChar(text) {
    const katakana = toKatakana(text);
    if (!ensureValidString(katakana, 'getLastChar')) return '';
    return katakana.slice(-1);
}