import { convertToKatakana } from "./conversion_process.js";

// 録音用インスタンス生成



export async function record() {
    let text = null;
    try {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognition) throw new Error("音声認識に対応していません");
        text = await new Promise((resolve) => {
            const recognition = new SpeechRecognition();
            recognition.onresult = (event) => {
                if (event.error === "no-speech") console.log("no sound"); 
                let _text = event.results[0][0].transcript;
                _text = convertToKatakana(_text);
                resolve(_text);
            };
            recognition.start();
        });
    } catch (e) {
        console.error(e);
    }
    return text;
}