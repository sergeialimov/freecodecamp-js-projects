const chunkArrayInGroups = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3); // should return [[0, 1, 2], [3, 4, 5], [6]].
