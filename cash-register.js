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
    1: 'DOLLAR',
    5: 'FIVE',
    10: 'TEN',
    20: 'TWENTY',
    100: 'ONE HUNDRED',
  };

  const result = { status: 'INSUFFICIENT_FUNDS', change: [] };

  // функция складывает сдачу
  // проверяет, есть ли уже такие номиналы. Если есть, то добавляет к существующему,
  // если нет, то добавляет новый
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

  // @change - общая сдача
  // !!!!!!!!! сделать чтобы метод не падал с пустым массивом !!!!!!!!!!
  const getBalance = (change) => change.map((x) => x[1])
    .reduce((accumulator, currentValue) => accumulator + currentValue[1]);

  // получение всех номиналов
  const amountsArr = Object.keys(amounts)
    .sort((a, b) => a - b);

  // @sum - то что надо вернуть - 5 dollars
  // @cash - то из чего можно вернуть
  // @amount - номинал
  const getChange = (sumOut) => {
    let cash = cashInput.slice();

    // @amount - номинал
    // @name - название банкноты
    // задача функции - уменьшить кол-во денег в кеше
    const getMoneyFromDrawer = (amount, name) => {
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
      cash = checkCash;
      console.log('cash', cash);
      return cash;
    };

    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    const findAmount = (sum) => {
      // получил номинал меньший или равный сумме
      console.log('sum', sum);

      const amount = amountsArr.filter((x) => x <= sum)
        .pop();
      console.log('amount', amount);

      // check for existing money in drawer
      if (getMoneyFromDrawer(amount, amounts[amount])) {
        console.log('if getMoneyFromDrawer', amount, amounts[amount]);

        putChange(amounts[amount], amount);
        return true;
      }
      // поиск меньшего номинала
      if (getMoneyFromDrawer() === false) {
        const lowerAmount = amountsArr.filter((x) => x < amount)
          .pop();
        if (lowerAmount.length > 0) {
          findAmount(lowerAmount);
        }
        return false;
      }
    };

    if (!findAmount(sumOut)) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    // console.log(result);

    // compare required change with prepared change
    // временно отключаю, так как на пустом массиве падает ошибка
    // const diff = getBalance(changeArr) - sum;
    // if (diff > 0) {
    //   getChange(diff);
    // } else {
    return result;
    // }
  };

  return getChange(sumInput);
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

