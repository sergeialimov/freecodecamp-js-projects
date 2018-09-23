// подсчет приготовленной сдачи
const getBalance = (change) => {
  if (change.length > 0) {
    return change.map((x) => x[1])
      .reduce((accumulator, currentValue) => accumulator + currentValue[1]);
  }
  return 0;
};

// @price - сумма к оплате
// @banknote - банкнота
const checkCashRegister = (price, banknote, cashInput) => {
  // const sum = (banknote - price).toFixed(2);
  const sumInput = 5;
  // console.log(sumInput);

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

  const result = { status: 'INSUFFICIENT_FUNDS', change: [] };

  // Если номинал существуе - прибавляет, если нет, то добавляет новый
  // @sum - сумма, которую необходимо добавить к сдаче
  // @amount - номинал банкноты
  const putChange = (amount, sum) => {
    console.log('putChange', amount, sum);
    const checkAmount = result.change.map((x) => {
      if (x[0] === amount) {
        return [amount, x[1] + sum];
      }
      return null;
    });
    console.log('checkAmount', checkAmount);

    if (result.change.length === 0 || checkAmount.includes(null)) {
      result.change.push([amount, sum]);
    } else {
      result.change = checkAmount;
    }
    console.log('result.change', result.change);
  };

  // задача функции - уменьшить кол-во денег в кеше
  // @amount - номинал
  // @name - название банкноты
  const getMoneyFromDrawer = (cash, amount, name) => {
    // console.log('getMoneyFromDrawer', amount, name);

    const checkCash = cash.map((x) => {
      if (x[0] === name && x[1] > 0) {
        return [name, x[1] - amount];
      } if (x[0] === name && x[1] === 0) {
        return null;
      }
      return x;
    });

    if (checkCash.includes(null)) {
      return false;
    }
    console.log('checkCash', checkCash);
    return checkCash;
  };

  // получение всех номиналов
  const amountsArr = Object.keys(amounts)
    .sort((a, b) => a - b);

  // @sum - то что надо вернуть - 5 dollars
  // @internalCash - то из чего можно вернуть
  const getChange = (sumOut, internalCash) => {
    // нужен ли этот кэш тут или подавать исходный
    console.log('internalCash', internalCash);

    let cash = internalCash.slice();
    console.log('-------------------------------');

    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    // добавить возвращаемое значение
    const findAmount = (sum) => {
      // получил номинал меньший или равный сумме
      console.log('sum', sum);

      const amount = amountsArr.filter((x) => x <= sum)
        .pop();
      console.log('amount', amount);

      // check for existing money in drawer

      const newCash = getMoneyFromDrawer(cash, amount, amounts[amount]);
      if (newCash) {
        console.log('if getMoneyFromDrawer', amount, amounts[amount]);

        putChange(amounts[amount], amount);
        return true;
      }
      // поиск меньшего номинала
      const lowerAmount = amountsArr.filter((x) => x < amount)
        .pop();
      if (lowerAmount.length > 0) {
        findAmount(lowerAmount);
      }
      return false;
    };

    if (!findAmount(sumOut)) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    // compare required change with prepared change
    const diff = sumInput - getBalance(result.change);
    console.log('diff', diff);

    if (diff > 0) {
      getChange(diff);
    }
    console.log('-------------------------------');
    return result;
  };
  return getChange(sumInput, cashInput);
};

console.log(checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 5],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]));
