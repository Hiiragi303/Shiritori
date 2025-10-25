export function canUseRecognition() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

let forceEnd = false;
export function record() {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    return new Promise((resolve, reject) => {
        const recognition = new SpeechRecognition();
        let isOk = false;

        recognition.onresult = (e) => {
            isOk = true;
            let text = e.results[0][0].transcript;
            console.log(`認識した語: ${text}`);
            recognition.stop();
            resolve(text);
        };

        recognition.onerror = (e) => {
            console.warn(e.error);
        };

        recognition.onend = () => {
            if (!isOk && !forceEnd) recognition.start();
            isOk = false;
            console.log("音声認識終了");
            if (forceEnd) {
                forceEnd = false;
                return 'end';
            }
        };

        if (!forceEnd) recognition.start();
    });
}

export function forceEndRecord() { forceEnd = true; }