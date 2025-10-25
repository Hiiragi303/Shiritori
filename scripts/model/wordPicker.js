import { getDict } from './morphological.js';
import { getFirstChar } from './textManager.js';

export function pickWordFromDict(lastChar) {
    const candidates = getDict().filter(w => getFirstChar(w) === lastChar);
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
}