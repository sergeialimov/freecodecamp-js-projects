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

  const changeArr = [];

  // @change - общая сдача
  const getBalance = (change) => change.map((x) => x[1])
    .reduce((accumulator, currentValue) => accumulator + currentValue[1]);

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

      cash = cash.map((x) => {
        if (x[0] === name) {
          return [name, x[1] - amount];
        }
        return x;
      });
      console.log('cash', cash);
    };

    // получение всех номиналов
    const amountsArr = Object.keys(amounts)
      .sort((a, b) => a - b);

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
      if (false) {
        const lowerAmount = amountsArr.filter((x) => x < amount)
          .pop();
        findAmount(lowerAmount);
      }
    };

    findAmount(sumOut);

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

  getChange(sumInput);
};

checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);
