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
};

// уменьшение кол-ва денег в кеше
// @amount - номинал
// @name - название банкноты
const getMoneyFromDrawer = (cash, amount, name) => {                                                              // console.log('getMoneyFromDrawer cash', cash, amount, name);
  let isMoneyEnough = false;
  const checkCash = cash.map((x) => {
    if (x[0] === name && x[1] > 0) {
      isMoneyEnough = true;
      return [name, (x[1] - amount).toFixed(2)];
    }
    return x;
  });                                                                                                             
  if (!isMoneyEnough) {console.log('not enough money');
    return false;
  }
  return checkCash;
};

// Если номинал существует - прибавляет, если нет - добавляет новый
// @sum - сумма, которую необходимо добавить к сдаче
// @title - название банкноты
// @amount - номинал банкноты
const putChange = (title, amount, changeInput) => {
  let change = changeInput.slice();
  let isAmountExists = false;
  const checkAmount = change.map((x) => {
    if (x[0] === title) {
      isAmountExists = true;
      const sum = parseFloat(x[1]) + amount;
      return [title, parseFloat(sum.toFixed(2))];
    }
    return x;
  });
  if (change.length === 0 || !isAmountExists) {
    change.push([title, amount]);
  } else {
    change = checkAmount;
  }
  console.log('change', change);
  return change;
};

const whatStatus = (cashInput, sumInput) => {
  if (getCashBalance(cashInput) - sumInput === 0) {                                                                 console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
    return 'CLOSED';
  }                                                                                                                 console.log('getCashBalance(cashInput)', getCashBalance(cashInput) - sumInput);
  return 'OPEN';
};

const findAmount = (sum, lowerAmountRequired) => {
  if (lowerAmountRequired) {
    // amount должен быть меньше не суммы, а предыдущего amount
    return amounts.filter((amount) => amount < sum).pop();
  }
  return amounts.filter((amount) => amount <= sum).pop();
};

// возвращает result.change и cash
const getCashAndChange = (sum, cash, change, amount) => {
  console.log('===');
  // получение номинала равного сумме или меньше
  const newCashDrawer = getMoneyFromDrawer(cash, amount, amountsTable[amount]);
  let result = {};
  // если деньги из лотка достали и вернулся новый cash drawer
  if (newCashDrawer) {
    console.log('newCashDrawer true', newCashDrawer);
    const changeResult = putChange(amountsTable[amount], parseFloat(amount), change);
    result = {
      cash: newCashDrawer,
      change: changeResult,
    };
  // если деньги достать не получилось и номинал = 0.01
  } else if (!newCashDrawer && amount === 0.01) {
    console.log('!newCashDrawer && amount === 0.01');
    return false;
  } else {
    // ищем меньший номинал
    const lowerAmount = findAmount(amount, true); // true - lowerAmountRequired
    if (lowerAmount) {
      console.log('lowerAmount', lowerAmount);
      return getCashAndChange(sum, cash, change, lowerAmount);
    }
  }
  return result;
};

module.exports.amountsTable = amountsTable;
module.exports.findAmount = findAmount;
module.exports.getCashAndChange = getCashAndChange;
module.exports.whatStatus = whatStatus;
module.exports.putChange = putChange;
module.exports.getMoneyFromDrawer = getMoneyFromDrawer;
module.exports.getCashBalance = getCashBalance;
module.exports.getBalance = getBalance;