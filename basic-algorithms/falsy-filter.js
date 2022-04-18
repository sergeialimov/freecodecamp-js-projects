const bouncer = (arr) => arr.filter(Boolean);

bouncer([true, null, 0, NaN, undefined, '']); // true
// bouncer([1, null, NaN, 2, undefined]); // 1, 2
