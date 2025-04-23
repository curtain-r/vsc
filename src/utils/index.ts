/**
 * 生成一个随机字符串
 * @returns 随机字符串
 */
export function getNonce() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}