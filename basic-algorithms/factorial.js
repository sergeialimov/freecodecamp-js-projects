function factorialize(num) {
  if (num === 0) { 
    return 1;
  }
  
  let fact = 1;
  for (let i = 1; i < num+1; i += 1) {
    fact *= i;
  };
  return fact;
}

console.log(factorialize(0));