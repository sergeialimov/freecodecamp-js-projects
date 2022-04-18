function whatIsInAName(collection, source) {
  var srcKeys = Object.keys(source);

  return collection.filter((obj) => {
    for(var i = 0; i < srcKeys.length; i++) {
      if(obj[srcKeys[i]] !== source[srcKeys[i]]) {
        return false;
      }
    }
    return true;
  });
}

console.log(
  whatIsInAName([
  
  { "apple": 1, "bat": 2, "cookie": 2 },
  { "apple": 13, "bat": 2,"cookie": 2 }

], { "apple": 1, "bat": 2 })
);
