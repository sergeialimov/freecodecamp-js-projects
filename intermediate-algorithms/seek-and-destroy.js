function destroyer (arr)  {
  const arr2 = Array.from(arguments).slice(1);
  return arguments[0].filter((x) => !arr2.includes(x));
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));
