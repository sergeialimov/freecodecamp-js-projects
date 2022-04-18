function truncateString(str, num) {
  let newStr = '';
  if (str.length > num) {
    newStr = `${str.substring(0, num)}...`
  } else {
    return str;
  }
  return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);