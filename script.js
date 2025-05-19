import { initTokenizer, convertToKatakana, loadNornDict } from "./conversion_process.js";
import { loadVoices, setVolume,speech } from "./sound_system.js";

const main = document.getElementById("main-content");

let isStarted = false;

async function init() {
    try {
        await initTokenizer();
        await loadNornDict();
        await loadVoices();

        // 何か処理
        main.style.display = "block";
        document.getElementById("start").addEventListener("click", start);
        document.getElementById("record").addEventListener("click", record);

    } catch (e) {
        console.error("初期化失敗: ", e);
    }
}

init();

// スタートボタンが呼び出されたときに実行する関数
function start() {
    isStarted = true;
    document.getElementById("start").style.display = "none";
    setVolume(0);
    speech("aaaa");
    setVolume(1);
    speech("しりとり");
}

// レコードボタンが呼び出されたときに実行する関数
function record() {
    // do something
}