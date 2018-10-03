const sh = require('./shared.js');

const checkCashRegister = (price, customersMoney, cashInput) => {
  const sumInput = (customersMoney - price).toFixed(2);
  let result = { status: sh.whatStatus(cashInput, sumInput), change: [] };
  console.log('result', result);


  const getChange = (sumOut, cashOut, changeOut) => {
    console.log('cashOut', cashOut);
    let cash = cashOut.slice();
    let change = changeOut.slice();
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
  return getChange(sumInput, cashInput, result.change);
};


console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
