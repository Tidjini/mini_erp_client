export function wordElipsis(word, length) {
  if (word === undefined || word === null) return "";
  if (word.length > length) {
    return word.substring(0, length) + "...";
  }
  return word;
}
