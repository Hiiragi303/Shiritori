import { convertToKatakana } from "./conversion_process.js";

export function record() {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        return new Promise((resolve, reject) => {
            const recognition = new SpeechRecognition();

            recognition.onresult = (event) => {
                let _text = event.results[0][0].transcript;
                _text = convertToKatakana(_text);
                console.log("認識した語: " + _text);
                recognition.stop();
                resolve(_text);
            };

            recognition.onerror = (event) => {
                console.log("認識エラー ", event.error);
                reject(event.error);
            };

            recognition.onend = () => {
                console.log("音声認識終了");
            }

            recognition.start();
        });
}