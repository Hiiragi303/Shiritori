const DICT_PATH = "./dict";
let tokenizer = null;

// 字句解析(tokenizer)の初期化
export async function initTokenizer() {
    if (tokenizer) return;

    tokenizer = await new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: DICT_PATH}).build(function (err, tokenizer) {
            if (err) reject(err);
            else resolve(tokenizer);
        });
    });
}



export function convertToKatakana(text) {
    if (!tokenizer) {
        console.error("tokenizerが初期化されていません。");
        return "";
    }

    const tokens = tokenizer.tokenize(text);
    return tokens.map(token => token.reading || token.surface_form);
}

export function reply() {
        if (!tokenizer) {
            console.error("tokenizerが初期化されていません。");
            return "";
        }

        // 辞書用意する必要がある
}