// import * as shared from './shared.js'
const sh = require('./shared.js')

// @price - сумма к оплате
// @banknote - банкнота
// @cashInput - money in cash drawer
const checkCashRegister = (price, banknotes, cashInput) => {
  const sumInput = (banknotes - price).toFixed(2);
  let result = { status: sh.whatStatus(cashInput, sumInput), change: [] };
  
  const getChange = (sumOut, internalCash) => {                                                          console.log('internalCash', internalCash);
    let cash = internalCash.slice();                                                                     console.log('-------------------------------');
    let sum = sumOut;
    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    
    let amount = sh.findAmount(sum, cash);
    if (!sh.findAmount(sumOut)) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }                                                                                                       console.log('sumInput', sumInput); console.log('getBalance(result.change)', sh.getBalance(result.change));
    // compare required change with prepared change
    const diff = (sumInput - sh.getBalance(result.change)).toFixed(2);                                          console.log('diff', diff);
    if (diff > 0) {
      getChange(diff, cash);
    }                                                                                                       console.log('quitting', result);
    return result;
  };
  return getChange(sumInput, cashInput);
};


// console.log(
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
 
 // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}


console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));


// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.