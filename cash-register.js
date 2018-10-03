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

// Getting all amounts
const amounts = Object.keys(amountsTable)
  .sort((a, b) => a - b);

// Getting sum of prepared change
// @change - current change
const getBalance = (change) => {
  if (change && change.length > 0) {
    return change.map((x) => parseFloat(x[1]))
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return 0;
};

// Returning total sum of cash
// @cash - incoming cash
const getCashBalance = (cash) => {
  if (cash.length > 0) {
    return cash.map((x) => parseFloat(x[1]))
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }
  return 0;
};

// Rejecting money from drawer
// @amount - номинал
// @name - название банкноты
const getMoneyFromDrawer = (cash, amount, name) => {
  let isMoneyEnough = false;
  const checkCash = cash.map((x) => {
    if (x[0] === name && x[1] > 0) {
      isMoneyEnough = true;
      return [name, (x[1] - amount).toFixed(2)];
    }
    return x;
  });
  if (!isMoneyEnough) {
    return false;
  }
  return checkCash;
};

// Add money to change. If amount is existing - add to that one. Else - create new.
// @sum - sum that should be add to change
// @title - banknote or coin title
// @amount - amount of banknote
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

// Getting status of operation
// @cash - available cash
// @sum - sum of required change
const whatStatus = (cash, sum) => {
  if (getCashBalance(cash) - sum === 0) {
    return 'CLOSED';
  }
  return 'OPEN';
};

// Finding amount
// @sum - sum that should be returned
// @lowerAmountRequired - for cases when there are no more money for required amount
const findAmount = (sum, lowerAmountRequired) => {
  if (lowerAmountRequired) {
    // amount должен быть меньше не суммы, а предыдущего amount
    return amounts.filter((amount) => parseFloat(amount) < parseFloat(sum))
      .pop();
  }
  return amounts.filter((amount) => parseFloat(amount) <= parseFloat(sum))
    .pop();
};

// Recursive function getting money from drawer and adding to change
// @sum - sum that should be returned
// @cash - available cash in drawer
// @change - prepared change
// @amount - amount of banknote or coin
const getCashAndChange = (sum, cash, change, amount) => {
  const newCashDrawer = getMoneyFromDrawer(cash, amount, amountsTable[amount]);
  let result = {};
  // case when getting money was successful
  if (newCashDrawer) {
    const changeResult = putChange(amountsTable[amount], parseFloat(amount), change);
    result = {
      cash: newCashDrawer,
      change: changeResult,
    };
  // case when no required banknote or coin in drawer
  } else if (!newCashDrawer && amount === 0.01) {
    return false;
  } else {
    const lowerAmount = findAmount(amount, true); // true - lowerAmountRequired
    if (lowerAmount) {
      return getCashAndChange(sum, cash, change, lowerAmount);
    }
  }
  return result;
};

// Main coordinate recursive function for checking cash
// @price - price of product
// @customersMoney - money from customer
// @cashInput - available cash
const checkCashRegister = (price, customersMoney, cashInput) => {
  const sumInput = (customersMoney - price).toFixed(2);
  const result = { status: whatStatus(cashInput, sumInput), change: [] };

  const getChange = (sumOut, cashOut, changeOut) => {
    const cash = cashOut.slice();
    const change = changeOut.slice();
    const sum = sumOut;
    const amount = findAmount(sum);
    const changeAndCash = getCashAndChange(sum, cash, change, amount);

    if (!changeAndCash.change) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }
    // comparing required change with prepared change
    const diff = (sumInput - getBalance(changeAndCash.change)).toFixed(2);
    if (diff > 0) {
      return getChange(diff, changeAndCash.cash, changeAndCash.change);
    }
    result.change = changeAndCash.change;
    if (result.status === 'CLOSED') {
      result.change = cashInput;
    }
    return result;
  };
  return getChange(sumInput, cashInput, result.change);
};
