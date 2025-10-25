/**
 * 指定された非同期関数をリトライ付きで実行する
 * @param {Function} asyncFunc - 実行したい非道期関数
 * @param {number} limit - 最大リトライ回数
 * @param {number} baseDeley - 待機の基準時間(ms)
 * @returns {Promise<void>}
 * @throws {Error} リトライ上限に達した場合
 */
export async function tryInit(asyncFunc, limit = 3, baseDeley = 500) {
    for (let i=1; i<=limit; i++) {
        try {
            await asyncFunc();
            return;
        } catch (err) {
            console.warn(`リトライ(${i}/${limit})`, err);
            await new Promise(resolve => setTimeout(resolve, baseDeley * i));
        }
    }
    throw new Error("初期化リトライ上限に達しました");
}