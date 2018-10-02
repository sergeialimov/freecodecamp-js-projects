const sh = require('./shared.js');

const checkCashRegister = (price, customersMoney, cashInput) => {
  const sumInput = (customersMoney - price).toFixed(2);
  const result = { status: sh.whatStatus(cashInput, sumInput), change: [] };
  console.log('result', result);


  const getChange = (sumOut, internalCash, changeOut) => {
    console.log('internalCash', internalCash);
    let cash = internalCash.slice();                                                                     console.log('-------------------------------');
    let change = changeOut.slice();                                                                     console.log('-------------------------------');
    const sum = sumOut;
    // у findAmount собственная sum, потому что она уменьшаются рекурсивно

    const amount = sh.findAmount(sum);

    const changeAndCash = sh.getCashAndChange(sum, cash, change, amount);
    console.log('changeAndCash', changeAndCash);

    if (!changeAndCash.change) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }
    // compare required change with prepared change
    const diff = (sumInput - sh.getBalance(changeAndCash.change)).toFixed(2);                                          
    if (diff > 0) {
      console.log('diff', diff);
      return getChange(diff, changeAndCash.cash, changeAndCash.change);
    }     
    result.change = changeAndCash.change;
    console.log('quitting', result);
    return result;
  };
  getChange(sumInput, cashInput, result.change);
};





checkCashRegister(19.5, 20,
  [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ["DIME", 0],
    ['QUARTER', 0],
    ["ONE", 0],
    ['FIVE', 0],
    ['TEN', 0],
    ["TWENTY", 0],
    ['ONE HUNDRED', 0]
  ]);









// result {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
// };