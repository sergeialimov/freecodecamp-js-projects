function spinalCase(str) {
  return str.split(/(?=[A-Z])(?=[\D])|\s|_/g).join('-').toLowerCase();
}

// spinalCase('This Is Spinal Tap');
// 
// spinalCase("AllThe-small things")
// 
// spinalCase("thisIsSpinalTap") //should return "this-is-spinal-tap".

// console.log(spinalCase("The_Andy_Griffith_Show"));


console.log(spinalCase("Teletubbies say Eh-oh"));
