// 録音用インスタンス生成
SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();


let voice = null;        

 /**
* 発話の設定
*/
const uttr = new SpeechSynthesisUtterance();  // 発話用インスタンス生成
uttr.lang = "ja-JP";  // 言語設定
uttr.rate = 1;  // 速度
uttr.pitch = 1;  // 高さ
uttr.volume = 1;  // 音量


// スタートしてるか
let isStarted = false;
// 現在の語
let text = "";
// 前の語
let preText = "しりとり";
// 辞書を用意
const lib = ["ばなな","りんご","もも","ぶどう"];
// 重複しないように
let memo = [];
// 履歴(画面表示用)
let history = [];

/**
 * スタートボタンが押されたときに呼び出される関数
 */
function start() {
    isStarted = true;
    document.getElementById("start").style.display = "none";
    uttr.volume = 0;
    speech("aaaa");
    uttr.volume = 1;
    speech("しりとり");
}


/**
 * 録音ボタンが押された時に呼び出される関数
 */
function record() {
    if (!isStarted) {
        return;
    }
    // 録音が完了したとき呼び出される関数
    recognition.onresult = (event) => {
        text = event.results[0][0].transcript// 録音したのものをテキストとして入手
        console.log(preText + " " + text);
        // 最初の文字と最後の文字があっているか確認
        if (!isMatched()) {
            console.log("前の文字の最後と一致していません！");
            return;
        }
        //console.log("認識された語: " + text);
 

        /**
         * HTMLにしりとりの履歴を表示
         */
        addHistory();
        showHistory();

        // んがついたら終わり
        if (isN()) {
            console.log("\"ん\"がつきました。終了です。");
            isStarted = false;
            deleteHisotry();
            document.getElementById("start").style.display = "inline-block";
        }

        preText = text;
        if (preText=="りんご") {text="ごぼう";}
        else text = "うし";
        /**
         * cpuのターン
         */
        // 最初の文字と最後の文字があっているか確認
        if (!isMatched()) {
            console.log("前の文字の最後と一致していません！");
            return;
        }
        //console.log("認識された語: " + text);
        speech(text);

        /**
         * HTMLにしりとりの履歴を表示
         */
        addHistory();
        showHistory();

        // んがついたら終わり
        if (isN()) {
            console.log("\"ん\"がつきました。終了です。");
            isStarted = false;
            deleteHisotry();
            document.getElementById("start").style.display = "inline-block";
        }
        preText = text;
    }
    // 録音開始
    recognition.start();
}

// 発話させる
function speech(text) {
    uttr.text = text;
    speechSynthesis.speak(uttr);
}





/**
 * 文字列編集系
 */
// 文字列の最初の文字を返す
function first(text) {
    let charList = text.split("");
    return charList[0];
}
// 文字列の最後の文字を返す
function last(text) {
    let charList = text.split("");
    return charList[charList.length - 1];
}

/**
 * 確認系
 */
// 前の文字列の最後と現在の文字列の最初があっているか
function isMatched() {return last(preText) == first(text)};
// 文字が"ん"で終わるか
function isN() {return last(text) === 'ん';}

/**
 * 履歴系
 */
// 履歴に追加
function addHistory() {
    history.push(preText + " -> " + text);
}
// 履歴を削除
function deleteHisotry() {
    const ul = document.getElementById("history");
    ul.innerHTML = "";
    history.splice(0);
}
// 履歴を画面に表示
function showHistory() {
    const ul = document.getElementById("history");
    ul.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
}

// ロードされた時の処理
window.addEventListener('load', () => {
    speechSynthesis.getVoices();
    const main = document.getElementById("main-content");
    speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        if (voices.length != 0) {
            main.style.display = "block";
            uttr.voice = voices.find(v => v.lang === "ja-JP");
        }
    }
});
  