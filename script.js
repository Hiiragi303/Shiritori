import { initTokenizer, convertToKatakana, loadNornDict } from "./conversion_process.js";
import { loadVoices, setVolume,speech } from "./sound_system.js";
import { record } from "./recog_system.js";

const main = document.getElementById("main-content");

let isStarted = false;
let texts = {
    preText: "シリトリ",
    text: null,
    memo: ["シリトリ"],
    history: [],
    forbiddenChar: "ン",
    setText: function(text) {
        this.text = text;
    },
    check: function() {
        if (!this.text || !this.preText) return false;
        if (this.text.endsWith(this.forbiddenChar)) return null;
        if (this.text.startsWith(this.last(this.preText)) && !this.memo.includes(this.text)) {
            this.memo.push(this.text);
            this.history.push([this.preText, this.text]);
            this.preText = this.text;
            this.text = null;
            return true;
        }
        else return false;
    },
    last: function(text) {
        if (!text) return;
        let charList = text.split("");
        return charList[charList.length - 1];
    },
};

async function init() {
    try {
        await initTokenizer();
        await loadNornDict();
        await loadVoices();

        // 何か処理
        main.style.display = "block";
        document.getElementById("start").addEventListener("click", start);
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
    speech("シリトリ");
    loop();
}

async function loop() {
    while (isStarted) {
        console.log("aa");
        let text = await record();
        texts.setText(text);
        let ch = texts.check();
        if (ch === null) {
            console.log("a");
            break;
        } else if (ch == false) continue;
        console.log(texts.history);
        console.log("loop");
    }
}