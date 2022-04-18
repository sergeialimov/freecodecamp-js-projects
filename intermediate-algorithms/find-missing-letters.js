function fearNotLetter(str) {
  const alphabet = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','r','s','t','u','v','w','x','y','z'
  ];
  
  const shift = alphabet.indexOf(str[0]);
  return alphabet.slice(shift, str.length + shift)
  .filter((x) => x !== str[str.indexOf(x)])[0];
}


function fearNotLetterFor(str) {
  const alphabet = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z'];
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== alphabet[i]) {
      return alphabet[i];
    }
  }
}

console.log(fearNotLetter("abce")); //d
// console.log(fearNotLetter("abcdefghjklmno")); //i
// console.log(fearNotLetter("bcdf")); // e
// console.log(fearNotLetter("stvwx")); // u
