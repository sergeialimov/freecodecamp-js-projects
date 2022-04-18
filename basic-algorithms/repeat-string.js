function repeatStringNumTimes(str, num) {
  let res='';
  for (let i = 0; i < num; i += 1) {
    res+=str;
  };
  return res;
}

repeatStringNumTimes("abc", 3);