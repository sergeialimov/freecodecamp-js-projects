const amountsTable = {
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
const amounts = Object.keys(amountsTable)
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
const getMoneyFromDrawer = (cash, amount, name) => {                                                              console.log('getMoneyFromDrawer cash', cash, amount, name);
  let isMoneyEnough = false;
  const checkCash = cash.map((x) => {
    if (x[0] === name && x[1] > 0) {
      isMoneyEnough = true;
      return [name, (x[1] - amount).toFixed(2)];
    }
    return x;
  });                                                                                                             console.log('checkCash', checkCash);
  if (!isMoneyEnough) {                                                                                           console.log('isMoneyEnough', isMoneyEnough);
    return false;
  }                                                                                                               console.log('newCash', checkCash);
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
  if (getCashBalance(cashInput) - sumInput === 0) {                                                                 console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
    return 'CLOSED';
  }                                                                                                                 console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
  return 'OPEN';
}

const findAmount = (sum, lowerAmountRequired) => {
  if (lowerAmountRequired) {
    return amounts.filter((amount) => amount < sum).pop();
  }
  return amounts.filter((amount) => amount <= sum).pop();
}

// возвращает result.change и cash
const getDrawerAndCash = (sum, cash, change, amount) => {                                                                                 console.log('sum', sum);
  // получение номинала равного сумме или меньше
  const newCashDrawer = getMoneyFromDrawer(cash, amount, amountsTable[amount]);
  // если деньги из лотка достали и вернулся новый cash drawer
  if (newCashDrawer) {
    // добавляем деньги к сдаче и возвращаем change. А как мы возвращаем cash?
    return {
      cash: newCashDrawer,
      change: putChange(amountsTable[amount], parseFloat(amount), change),
    }
  // если деньги достать не получилось и номинал = 0.01
  } else if (!newCashDrawer && amount === 0.01) {                                                                       console.log('findAmount cash', cash);
    return false;
  }
  
  // ищем меньший номинал
  const lowerAmount = findAmount(sum, true); // true - lowerAmountRequired
  if (lowerAmount) {
    findAmountAndGetMoneyFromDrawer(sum, cash, change, lowerAmount);
  }
};

const findAmount = (sum, cash) => {                                                                                 console.log('sum', sum);
  // получил номинал меньший или равный сумме
  const amount = amounts.filter((x) => x <= sum)
    .pop();                                                                                                         console.log('amount', amount);
  const checkCash = getMoneyFromDrawer(cash, amount, amountsTable[amount]);
  if (checkCash) {                                                                                                  console.log('findAmount cash', cash);
    result.change = putChange(amountsTable[amount], parseFloat(amount), result.change);
    return result;
  } else if (!checkCash && amount === 0.01) {                                                                       console.log('findAmount cash', cash);
    return false;
  }
  // поиск меньшего номинала
  const lowerAmount = amounts.filter((x) => x <= amount)
    .pop();
  if (lowerAmount.length > 0) {
    findAmount(lowerAmount);
  }
  return false;
};




module.exports.amountsTable = amountsTable;
module.exports.findAmount = findAmount;
module.exports.whatStatus = whatStatus;
module.exports.putChange = putChange;
module.exports.getMoneyFromDrawer = getMoneyFromDrawer;
module.exports.getCashBalance = getCashBalance;
module.exports.getBalance = getBalance;