function convertHTML(str) {
  const replacement = {
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    '\'':"&apos;"
  }
  return str.split('').map((char) => replacement[char] || char).join('');
}


