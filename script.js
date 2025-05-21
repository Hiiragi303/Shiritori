import { initTokenizer, loadNornDict, decideWord} from "./conversion_process.js";
import { loadVoices, setVolume,speech } from "./sound_system.js";
import { record } from "./recog_system.js";
import { Result, setText, check, getLastCharOfPreText, update } from "./textManager.js";

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
    } catch (e) {
        console.error("初期化失敗: ", e);
    }
}

init();

// スタートボタンが呼び出されたときに実行する関数
async function start() {
    isStarted = true;
    document.getElementById("start").style.display = "none";
    setVolume(0);
    await speech("aaaa");
    setVolume(1);
    await speech("しりとりはじめ");
    shiritori();
}

function shiritori() {
    computerTurn("シリトリ");
}

// コンピュータ側が行う処理
async function computerTurn(text) {
    console.log("コンピュータのターン");
    if (text) {
        await speech(text);
        await userTurn();
        return;
    }
    let nextWord = decideWord(getLastCharOfPreText());
    console.log(nextWord);
    setText(nextWord);
    let result = check();
    switch (result) {
        case Result.SUCCESSS:    
            update();
            console.log("a");
            await speech(nextWord);
            await userTurn();
            break;
        case Result.RETRY || Result.GAMVE_OVER:
            speech("まいりました");
            break;
    }
}

// ユーザー側が行う処理
async function userTurn() {
    console.log("ユーザーのターン");
    try {
        let input = await record();
        setText(input);
        const result = check();
        // console.log(result == Result.SUCCESSS);
        switch (result) {
            case Result.SUCCESSS:
                update();
                await computerTurn();
                
                break;
            case Result.RETRY:
                alert("頭文字があっていないか、すでに使われてます");
                await userTurn();
                break;
            case Result.GAMVE_OVER:
                alert("\'ん\'がつきました。終了！");
                break;
        }
    } catch (e) {
        console.log(e.error);
    }
}