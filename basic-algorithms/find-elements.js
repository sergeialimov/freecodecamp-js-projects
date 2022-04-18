function findElement(arr, func) {
  const elements = arr.filter(func);
  return elements[0] || undefined;
}

findElement([1, 2, 3, 4], num => num % 2 === 0);