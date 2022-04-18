function largestOfFour(arr) {
  
  // copying array for non-mutable reasons
  const newArr = arr.slice();
  const result = [];
  
  // sorting arrays from largest to smallest numbers
  newArr.forEach((subArr) => {
    subArr.sort((a, b) => {
     return b - a;
   });
  });
  
  // getting first elements as largest
  newArr.forEach((subArr) => {
     result.push(subArr[0])
  });
  
  return result;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);