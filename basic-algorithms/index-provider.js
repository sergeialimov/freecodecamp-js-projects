const getIndexToIns = (arr, num) => {
  const newArr = arr.slice();
  newArr.sort((a, b) => a - b);

  const res = newArr.filter((item) => item < num);
  const lastSmallerItem = res[res.length - 1];
  return newArr.lastIndexOf(lastSmallerItem) + 1;
};

getIndexToIns([5, 3, 20, 3], 5); // should return 2
