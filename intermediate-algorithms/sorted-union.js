function uniteUnique(...arr) {
  
  const flattened = arr.reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
  },[]);
  
  const result = flattened.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  },[]);
}

// uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
console.log(uniteUnique([1, 3, 2], [1, [5]], [2, [4]]));
