import { tryInit } from "../utils/tryInit.js";
import { initTokenizer, initDict } from "../model/morphological.js";
import { initVoices, initUttr, warmUpSpeech } from "../model/speech.js";
import { canUseRecognition } from "../model/recognition.js";
import { createView } from "../view/view.js";
import { runTurnLoop, stopGame } from "./turnState.js";

/**
 * 画面がロードされたら実行する処理
 */
window.addEventListener("DOMContentLoaded", async () => {
    // 描画関数のview用意
    const view = createView();
    // ボタンの無効化
    view.disableStartButton();
    view.disableEndButton();

    try {
        // 初期化処理
        await tryInit(initTokenizer);
        await tryInit(initDict);
        if (!canUseRecognition) throw new Error("音声認識が対応していません");
        await tryInit(initVoices,4);
        await tryInit(initUttr,4);
        await tryInit( warmUpSpeech);
        console.log("全て初期化完了")

        // スタートボタンのみ有効化
        view.enableStartButton();
        // スタートボタンが押されたときの処理
        view.onStart(() => {
            console.log("スタートボタンが押された");
            view.disableStartButton();
            view.enableEndButton();
            runTurnLoop(view);
        });
        // 参らせるボタンを押したときの処理
        view.onEnd(() => {
            console.log("終了ボタンが押された");
            // データクリア
            stopGame(view);
        });
    } catch (err) {
        console.error(err);
        stopGame();
        resetWordsState();
        view.resetInfo();
        view.disableEndButton();
        view.enableStartButton();
    }
});


