import { userTurn } from './userTurn.js';
import { computerTurn, forceEndComputer, setFirstTime } from './computerTurn.js';

import { speech } from "../model/speech.js";
import { forceEndRecord } from '../model/recognition.js';
import { resetWordsState } from '../model/wordState.js';

let currentState = 'computer';
let isRunning = false;

export async function runTurnLoop(view) {
    isRunning = true;

    while (isRunning) {
        if (currentState === 'user') {
            view.renderTurn(true);
            const result = await userTurn(view);
            if (result === "end") break;
            currentState = 'computer';
        } else if (currentState == 'computer') {
            view.renderTurn(false);
            const result = await computerTurn(view);
            if (result === 'notFound') break;
            currentState = 'user';
        }
    }
    if (isRunning) await stopGame(view);
    return;
}

export async function stopGame(view) {
    // ループを止める
    isRunning = false;
    // 録音を止める
    forceEndRecord();
    // コンピューターの出力を止める
    forceEndComputer();
    // 結果画面を表示する
    const isUserWon = currentState === 'computer';
    view.renderResult(isUserWon);
    // 参りましたって言わせる　または
    // はい、お前の負けーって言わせる
    if (isUserWon) await speech("参りました");
    else await speech("どやあ！");
    
    // currentStateを戻す
    currentState = 'computer';
    // 既出単語などの保存削除
    resetWordsState();
    // 描画のクリア
    view.resetInfo();
    // ボタンの有効化/無効化
    view.disableEndButton();
    view.enableStartButton();
    
    setFirstTime();
}