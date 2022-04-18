const sumAll = (arr) => {
  const newArr = arr.slice().sort((a, b) => a - b);
  let result = 0;
  for (let i = arr[0]; i < newArr[1]+1; i += 1) {
    result += i;
  }
  return result;
}

console.log(sumAll([5, 10]));