// 発話用の声
let voice = null;

/**
* 発話の設定
*/
const uttr = new SpeechSynthesisUtterance();  // 発話用インスタンス生成
uttr.lang = "ja-JP";  // 言語設定
uttr.rate = 1;  // 速度
uttr.pitch = 1;  // 高さ
uttr.volume = 1;  // 音量

// 声リストの取得
export async function loadVoices() {
    voice = await new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices.find(v => v.lang === "ja-JP"));
        } else {
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
                resolve(voices.find(v => v.lang === "ja-JP"));
            };
        }
    });
    if (!voice) throw new Error();
    console.log("ロード完了");
    console.log(voice.lang);
}

// 発話させる
export function speech(text) {
    if (!voice) return;
    return new Promise((resolve) => {
        uttr.onend = resolve;
        uttr.text = text;
        speechSynthesis.speak(uttr);
    })
}

// volumeをセット
export function setVolume(volume) {
    uttr.volume = volume;
}