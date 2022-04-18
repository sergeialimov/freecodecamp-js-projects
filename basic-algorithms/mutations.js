const mutation = (arr) => {
  const firstWord = arr[0].toLowerCase()
    .split('');
  const secondWord = arr[1].toLowerCase()
    .split('');
  let result = true;
  secondWord.forEach((char) => {
    if (!firstWord.includes(char)) {
      result = false;
    }
  });
  return result;
};

mutation(['hello', 'hey']);
