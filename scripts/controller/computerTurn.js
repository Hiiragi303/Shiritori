import { judgeWord } from "../model/judge.js";
import { getLastChar } from "../model/textManager.js";
import { pickWordFromDict } from "../model/wordPicker.js";
import { setLastWord, addUsedWord, getLastWord } from "../model/wordState.js";
import { speech } from "../model/speech.js";
import { toNormalizedKatakana } from "../model/textConverter.js";

// コンピューターが辞書から選べる回数
const pickLimit = 3;
// 初回かどうか
let isFirst = true;
// 強制終了するか
let forceEnd = false;
/**
 * コンピューター側の処理の流れ
 * @param {any} view - 描画用の関数がまとまったもの
 * @returns {Promise<void>} 成功時
 */
export async function computerTurn(view) {
    for (let i=1; i<=pickLimit; i++) {
        // 初回のみの処理
        if (isFirst) {
            isFirst = false;
            const initialWord = 'しりとりはじめ';
            await speech(initialWord);
            update(view, initialWord);
            return;
        }
        // 辞書からランダムで抽出
        const word = pickWordFromDict(getLastChar(toNormalizedKatakana(getLastWord())));
        // 判定
        const result = judgeWord(word);
        if (result.ok) {
            if (!forceEnd) {
                await speech(word);
                update(view, word);
            }
            return;
        } else {
            view.appendChatMessage('えっと...', false);
            await speech("えっと", 0.5);
        }
    }
    return "notFound";
}

export function setFirstTime() {
    isFirst = true;
    forceEnd = false;
}
export function forceEndComputer() {
    forceEnd = true;
}

function update(view, word) {
    // 状態更新
    setLastWord(word);
    addUsedWord(word);
    // 描画更新
    view.appendChatMessage(word, false)
    view.appendUsedWord(word);
}