const DICT_PATH = "../../dict";
const CSV_PATH = "../../norn_dict";
let tokenizer = null;
let dict = null;

/**
 * 形態素解析Tokenizerを初期化する関数
 * @async
 * @returns {Promise<void>} 既存である場合 or 初期化完了時
 * @throws {Error} 初期化失敗時
 */
export async function initTokenizer() {
    if (tokenizer) return;

    return new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: DICT_PATH }).build((err, tokenizerInstance) => {
            if (err) reject(new Error(`Tokenizer初期化失敗: ${err.message}`));
            else {
                tokenizer = tokenizerInstance;
                console.log("Tokenizer初期化完了");
                resolve();
            }
        });
    });
}

/**
 * 名詞辞書を初期化する関数
 * @async
 * @returns {Promise<void>} 既存である場合 or 初期化完了時
 * @throws {Error} ファイル読み込み失敗時　or 初期化失敗時
 */
export async function initDict() {
    if (dict) return;

    const response = await fetch(`${CSV_PATH}/Noun.csv`);
    if (!response.ok) throw new Error("CSVファイルの読み込み失敗");

    const csv_text = await response.text();
    dict = csv_text
        .split("\n")
        .map(line => line.split(",")[0]?.trim())
        .filter(Boolean)
    
    if (!dict?.length) throw new Error("辞書の作成失敗")
    
    console.log("辞書初期化完了");
}

export function getTokenizer() { return tokenizer; }
export function getDict() { return dict; }