// @price - сумма к оплате
// @banknote - банкнота
const checkCashRegister = (price, banknote, cashInput) => {
  // const sum = (banknote - price).toFixed(2);
  const sumInput = 5;
  // console.log(sumInput);
  let status = '';

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

  const changeArr = [];

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
      console.log('getMoneyFromDrawer', amount, name);

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

        changeArr.push([amounts[amount], amount]);
        return true;
      }
      // тут описать когда надо искать меньший номинал
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

    console.log(changeArr);

    // compare required change with prepared change
    // временно отключаю, так как на пустом массиве падает ошибка
    // const diff = getBalance(changeArr) - sum;
    // if (diff > 0) {
    //   getChange(diff);
    // } else {
    // return changeArr;
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
  ['FIVE', 0],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]));

