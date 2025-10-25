import { ensureValidString } from "../utils/ensureValidString.js";
import { toKatakana } from "./textConverter.js";

let utter = null;
let voice = null;
let speechQueue = Promise.resolve();

export async function initVoices() {
    return new Promise((resolve, reject) => {
        function pickVoice() {
            const voices = speechSynthesis.getVoices();
            const jaVoice = voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google'));
            if (jaVoice) {
                voice = jaVoice;
                console.log('音声ロード完了: ', voice.name);
                resolve();
            } else {
                reject(new Error('日本語音声が見つかりませんでした'));
            }
        }
        if (speechSynthesis.getVoices().length) pickVoice();
        else speechSynthesis.onvoiceschanged = pickVoice;
        resolve();
    });
}

export async function initUttr() {
    if (!voice) throw new Error('voiceを初期化してください');
    utter = new SpeechSynthesisUtterance();
    utter.voice = voice;
    utter.lang = 'ja-JP';
    utter.rate = 1.0;
    utter.pitch = 1.0;
    console.log('utter準備完了');
    return;
}

export async function warmUpSpeech() {
    if (!voice || !utter) throw new Error('voiceとutterを初期化してください');
    utter.volume = 0.0;
    utter.text="サイレントウォームアップ";
    speechSynthesis.speak(utter);
    await new Promise(r => setTimeout(r, 300));
    console.log('ウォームアップ完了');
}

export async function speech(text, volume = 1.0) {
    speechQueue = speechQueue.then(() => playSpeech(text, volume));
    return speechQueue;
}

async function playSpeech(text, volume) {
    if (!ensureValidString(text, 'speech')) return;
    if (!utter) {
        console.log('utterがありません');
        return;
    }
    const katakana = toKatakana(text);
    utter.text = katakana;
    utter.volume = volume;

    return new Promise(resolve => {
        utter.onend = resolve;
        setTimeout(() => speechSynthesis.speak(utter), 500);
    });
}