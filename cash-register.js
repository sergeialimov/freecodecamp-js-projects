const amounts = {
  0.01: 'PENNY',
  0.05: 'NICKEL',
  0.1: 'DIME',
  0.25: 'QUARTER',
  1: 'ONE',
  5: 'FIVE',
  10: 'TEN',
  20: 'TWENTY',
  100: 'ONE HUNDRED',
};

// получение всех номиналов
const amountsArr = Object.keys(amounts)
  .sort((a, b) => a - b);

// подсчет приготовленной сдачи
const getBalance = (change) => {
  if (change.length > 0) {
    return change.map((x) => parseFloat(x[1]))
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return 0;
};

// returning total sum of cash
// @cash - incoming cash
const getCashBalance = (cash) => {
  if (cash.length > 0) {
    return cash.map((x) => parseFloat(x[1]))
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return 0;
} 

// уменьшение кол-ва денег в кеше
// @amount - номинал
// @name - название банкноты
const getMoneyFromDrawer = (cash, amount, name) => {                                                    console.log('getMoneyFromDrawer cash', cash, amount, name);
  let isMoneyEnough = false;
  const checkCash = cash.map((x) => {
    if (x[0] === name && x[1] > 0) {
      isMoneyEnough = true;
      return [name, (x[1] - amount).toFixed(2)];
    }
    return x;
  });                                                                                                    console.log('checkCash', checkCash);
  if (!isMoneyEnough) {                                                                                  console.log('isMoneyEnough', isMoneyEnough);
    return false;
  }                                                                                                      console.log('newCash', checkCash);
  return checkCash;
};

// Если номинал существует - прибавляет, если нет - добавляет новый
// @sum - сумма, которую необходимо добавить к сдаче
// @amount - номинал банкноты
const putChange = (amount, sum, changeInput) => {
  let change = changeInput.slice();
  let isAmountExists = false;
  const checkAmount = change.map((x) => {
    if (x[0] === amount) {
      isAmountExists = true;
      return [amount, x[1] + sum];
    }
    return x;
  });
  if (change.length === 0 || !isAmountExists) {
    change.push([amount, sum]);
  } else {
    change = checkAmount;
  }
  return change;                                                                                                    console.log('result.change', result.change);
};

const whatStatus = (cashInput, sumInput) => {
  if (getCashBalance(cashInput) - sumInput === 0) {                                                        console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
    return 'CLOSED';
  }                                                                                                console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
  return 'OPEN';
}

// @price - сумма к оплате
// @banknote - банкнота
// @cashInput - money in cash drawer
const checkCashRegister = (price, banknotes, cashInput) => {
  const sumInput = (banknotes - price).toFixed(2);
  let result = { status: whatStatus(cashInput, sumInput), change: [] };
  
  const getChange = (sumOut, internalCash) => {                                                          console.log('internalCash', internalCash);
    let cash = internalCash.slice();                                                                     console.log('-------------------------------');
    let sum = sumOut;
    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    const findAmount = (sum) => {                                                                        console.log('sum', sum);
      // получил номинал меньший или равный сумме
      const amount = amountsArr.filter((x) => x <= sum)
        .pop();                                                                                           console.log('amount', amount);
      const checkCash = getMoneyFromDrawer(cash, amount, amounts[amount]); // false
      if (checkCash) {                                                                                    console.log('findAmount cash', cash);
        result.change = putChange(amounts[amount], parseFloat(amount), result.change);
        return true;
      } else if (!checkCash && amount === 0.01) {                                                         console.log('findAmount cash', cash);
        return false;
      }
      // поиск меньшего номинала
      const lowerAmount = amountsArr.filter((x) => x <= amount)
        .pop();
      if (lowerAmount.length > 0) {
        findAmount(lowerAmount);
      }
      return false;
    };
    if (!findAmount(sumOut)) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }                                                                                                       console.log('sumInput', sumInput); console.log('getBalance(result.change)', getBalance(result.change));
    // compare required change with prepared change
    const diff = (sumInput - getBalance(result.change)).toFixed(2);                                          console.log('diff', diff);
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