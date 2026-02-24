/**
 * 文字列をnumeronymに変換する
 * @param word 変換する文字列
 * @returns numeronym文字列
 */
export function numeronym(word: string): string {
  if (word.length <= 2) {
    return word;
  }

  const firstChar = word[0];
  const lastChar = word[word.length - 1];
  const middleCount = word.length - 2;

  return `${firstChar}${middleCount}${lastChar}`;
}
