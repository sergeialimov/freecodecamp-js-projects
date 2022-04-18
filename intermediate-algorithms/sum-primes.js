function sumPrimes(num) {
  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) { 
        return false;
      }; 
    }
    return num !== 1 && num !== 0;
  }
  
  let arr = Array.from({ length: num + 1 }, (v, k) => k ).slice(2);
  
  return arr.filter(x => isPrime(x))
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}

console.log(sumPrimes(10));