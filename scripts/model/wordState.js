// ==================================================
// 前の単語と既出単語リスト用意
// ==================================================
let lastWord = '';
let usedWords = [];

// ==================================================
// 前の単語系
// ==================================================
export function setLastWord(word) { lastWord = word; }
export function getLastWord() { return lastWord; }

// ==================================================
// 既出単語リスト系
// ==================================================
export function addUsedWord(word) { usedWords.push(word); }
export function getUsedWords() { return [...usedWords]; }
export function isUsedWord(word) { return usedWords.includes(word); }

// ==================================================
// リセット
// ==================================================
export function resetWordsState() {
    lastWord = '';
    usedWords = [''];
}