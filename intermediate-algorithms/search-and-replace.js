function myReplace(str, before, after) {
  let afterStr = after;
  
  if (before[0].toLowerCase() !== before[0]) {
    afterStr = afterStr[0].toUpperCase() + afterStr.slice(1);
    
  } 
  return str.replace(before, afterStr);
  
}

// console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
// console.log(myReplace("He is Sleeping on the couch", "Sleeping", "sitting"));
console.log(myReplace("Let us go to the store", "store", "mall"));
