function reverseString(str) {
  let newWord='';
  for (let i = str.length -1; i > -1; i -= 1) {
    newWord += str[i];
  };
  return newWord;
}

reverseString("hello");