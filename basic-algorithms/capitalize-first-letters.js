const titleCase = (str) => {
  const arr = str.toLowerCase()
    .split(' ');
  const newArr = [];
  arr.forEach((word) => {
    newArr.push(word[0].toUpperCase() + word.slice(1, word.length));
  });

  return newArr.join(' ');
};

titleCase("I'm a little tea pot");
