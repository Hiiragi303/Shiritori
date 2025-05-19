import { initTokenizer, convertToKatakana, loadNornDict } from "./conversion_process.js";

async function init() {
    try {
        await initTokenizer();
        await loadNornDict();

        // 何か処理
    } catch (e) {
        console.error("初期化失敗: ", e);
    }
}

init();