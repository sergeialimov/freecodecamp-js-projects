function findLongestWordLength(str) {
  const arr = str.split(' ');
  arr.sort((a, b) => {
    return b.length - a.length;
  });
  return arr[0];
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");