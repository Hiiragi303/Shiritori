// MVCのView
export const createView = () => {
    // ==================================================
    // 要素取得
    // ==================================================
    const startBtn = document.getElementById('startBtn');
    const endBtn = document.getElementById('endBtn');
    const turn = document.getElementById('turn')
    const chatArea = document.getElementById('chatArea');
    const usedWords = document.getElementById('usedWords');
    const toastRoot = document.getElementById('toastRoot');
    const resultOverlay = document.getElementById('result-overlay');
    const recogedWord = document.getElementById('recogedWord');

    // ==================================================
    // ボタンイベント
    // ==================================================
    function onStart(callback) { startBtn.addEventListener('click', callback); }
    function onEnd(callback) { endBtn.addEventListener('click', callback); }

    // ==================================================
    // ボタン有効化無効化
    // ==================================================
    function enableStartButton() { startBtn.disabled = false; }
    function disableStartButton() { startBtn.disabled = true; }
    function enableEndButton() { endBtn.disabled = false; }
    function disableEndButton() { endBtn.disabled = true; }

    // ==================================================
    // 描画系
    // TailwindCSS使用
    // ==================================================

    /**
     * ターンを表示する関数
     * @param {boolean} isUser - ユーザーかどうか
     * @returns {void}
     */
    function renderTurn(isUser) {
        turn.textContent = isUser
            ? 'あなたの番'
            : 'コンピューターの番'
    }

    /**
     * チャット欄にしりとりの回答を追加描画する関数
     * @param {string} word - 追加描画する単語
     * @param {boolean} isUser - ユーザーかどうか
     * @returns {void}
     */
    function appendChatMessage(word, isUser) {
        // アイコンとテキストのバブルを横並びにするためのラッパー
        const wrapper = document.createElement('div');
        wrapper.className = isUser
            ? 'justify-self-end flex items-start gap-2 flex-row-reverse'
            : 'justify-self-start flex items-start gap-2';

        // カラーのアイコン
        const icon = document.createElement('div');
        icon.className = isUser
            ? 'w-9 h-9 rounded-full bg-green-300'
            : 'w-9 h-9 rounded-full bg-gray-300';
        
        // テキストのバブル
        const bubble = document.createElement('div');
        bubble.className = isUser
            ? 'max-w-[70%] px-4 py-2 rounded-2xl rounded-tr-none bg-green-100 text-gray-800'
            : 'max-w-[70%] px-4 py-2 rounded-2xl rounded-tl-none bg-gray-100 text-gray-800';
        bubble.textContent = word;

        // まとめる
        wrapper.appendChild(icon);
        wrapper.appendChild(bubble);

        chatArea.appendChild(wrapper);
    }

    /**
     * 既出語リストに新しく追加する関数
     * @param {string} word - 追加描画する既出語
     * @returns {void}
     */
    function appendUsedWord(word) {
        const li = document.createElement('li');
        li.textContent = word;
        usedWords.appendChild(li);
    }

    function renderRecogedWord(word) {
        recogedWord.textContent = word;
    }

    // ==================================================
    // 警告
    // ==================================================
    function renderWarning(reason) {
        const toast = document.createElement('div');
        toast.textContent = reason;
        toast.className = `
            pointer-events-auto
            bg-orange-100 text-orange-900
            border border-orange-300
            rounded-lg shadow-md
            px-3 py-2 mb-2
            text-sm
            opacity-0 translate-x-4
            transition-all duration-300 ease-out
        `;
        toastRoot.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('opcacity-0', 'translate-x-4');
            toast.classList.add('opacity-100', 'translate-x-0');
        });

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-4');
            toast.classList.remove('opacity-100', 'translate-x-0');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    // ==================================================
    // 終了画面
    // ==================================================
    function renderResult(isUserWon) {
        const result = document.createElement('div');
        result.className = isUserWon
            ? 'text-6xl font-bold text-blue bg-white/10 border border-blue/20 rounded-2xl p-12 shadow-xl'
            : 'text-6xl font-bold text-red bg-white/10 border border-red/20 rounded-2xl p-12 shadow-xl';
        result.textContent = isUserWon
            ? '勝利!'
            : '敗北...';
        resultOverlay.appendChild(result);

        requestAnimationFrame(() => {
            resultOverlay.classList.remove('hidden');
        });

        setTimeout(() => {
            resultOverlay.innerHTML = '';
            resultOverlay.classList.add('hidden');
        }, 2500);
    }

    // ==================================================
    // リセット
    // チャット欄と既出単語リストのリセット
    // ==================================================
    function resetInfo() {
        chatArea.innerHTML = '';
        usedWords.innerHTML = '';
    }

    return {
        onStart, onEnd,
        renderTurn,
        appendChatMessage,
        appendUsedWord,
        renderRecogedWord,
        enableStartButton, disableStartButton,
        enableEndButton, disableEndButton,
        renderWarning, resetInfo,
        renderResult,
    };
};