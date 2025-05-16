const DICT_PATH = "./dict";
let tokenizer = null;
let dict = ["ごりら","パンダ","うし","カラス","ミシシッピアカミミガメ"];

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
    return tokens.map(token => token.reading || token.surface_form).join("");
}

export function reply(startChar,memo) {
        if (!tokenizer) {
            console.error("tokenizerが初期化されていません。");
            return "";
        }

        const wordsStartWith = dict.filter(word => {
            const tokens = tokenizer.tokenize(word);
            const token = tokens[0];
            return token.pos == "名詞" && token.reading.startsWith(startChar) && !token.reading.endsWith("ン") && !memo.includes(token.reading);
        });
        return wordsStartWith[0];
}