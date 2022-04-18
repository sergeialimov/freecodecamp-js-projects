const frankenSplice = (arr1, arr2, n) => {
  const res = arr2.slice();
  res.splice(n, 0, ...arr1);
  return res;
};

frankenSplice([1, 2, 3], [4, 5, 6], 1);
