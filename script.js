import { initTokenizer, convertToKatakana} from "./conversion_process.js";

async function init() {
    try {
        await initTokenizer();
    } catch (e) {
        console.error("初期化失敗: ", e);
    }
}

init();