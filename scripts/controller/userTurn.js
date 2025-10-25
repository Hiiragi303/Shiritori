import { record } from "../model/recognition.js";
import { judgeWord } from "../model/judge.js";
import { setLastWord, addUsedWord } from "../model/wordState.js";

export async function userTurn(view) {
    while (true) {
        // 音声入力
        const text = await record();
        if (text === "end") break;
        view.renderRecogedWord(text);
        // 判定
        const result = judgeWord(text);

        if (result.ok) {
            // 状態更新
            setLastWord(text);
            addUsedWord(text);
            // 描画更新
            view.appendChatMessage(text, true);
            view.appendUsedWord(text);
            return;
        } else {
            // 音声入力失敗の原因アラート
            view.renderWarning(result.reason);
            if (result.reason === '\"ん\"で終わっています') {
                console.log("終了");
                break;
            }
        }
    }
    return 'end';
}