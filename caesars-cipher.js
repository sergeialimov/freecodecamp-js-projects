function rot13(str) { 
  return str.replace(/[A-Z]/g, s => String.fromCharCode((s.charCodeAt(0) % 26) + 65));
}

console.log(rot13("SERR PBQR PNZC"));
