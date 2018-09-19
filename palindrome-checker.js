function palindrome(str) {
  const newStr = str.replace(/_|\W*/g, '').toLowerCase();
  return newStr.split('').reverse().join('') === newStr;
}

console.log(palindrome("_eye"));
console.log(palindrome("A man, a plan, a canal. Panama"));
