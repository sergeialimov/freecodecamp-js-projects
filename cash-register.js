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
    
    console.log('bal', bal);
    return bal.toFixed(2);
  }
  return 0;
};

// задача функции - уменьшить кол-во денег в кеше
// @amount - номинал
// @name - название банкноты
const getMoneyFromDrawer = (cash, amount, name) => {
  console.log('getMoneyFromDrawer cash', cash);
  
  let isMoneyEnough = false;
  const checkCash = cash.map((x) => {
    if (x[0] === name && x[1] > 0) {
      isMoneyEnough = true;
      return [name, (x[1] - amount).toFixed(2)];
    }
    return x;
  });
  
  if (!isMoneyEnough) {
    console.log('isMoneyEnough', isMoneyEnough);
    return false;
  }
  console.log('newCash', checkCash);
  return checkCash;
};

// @price - сумма к оплате
// @banknote - банкнота
// @cashInput - money in cash drawer
const checkCashRegister = (price, banknote, cashInput) => {
  // const sum = (banknote - price).toFixed(2);
  const sumInput = 0.11;
  let result = { status: 'INSUFFICIENT_FUNDS', change: [] };

  // Если номинал существует - прибавляет, если нет - добавляет новый
  // @sum - сумма, которую необходимо добавить к сдаче
  // @amount - номинал банкноты
  const putChange = (amount, sum) => {
    let isAmountExists = false;
    const checkAmount = result.change.map((x) => {
      if (x[0] === amount) {
        isAmountExists = true;
        return [amount, x[1] + sum];
      }
      return x;
    });
    if (result.change.length === 0 || !isAmountExists) {
      result.change.push([amount, sum]);
    } else {
      result.change = checkAmount;
    }
    console.log('result.change', result.change);
  };

  // @sum - то что надо вернуть - 5 dollars
  // @internalCash - то из чего можно вернуть
  const getChange = (sumOut, internalCash) => {                                                         console.log('internalCash', internalCash);
    let cash = internalCash.slice();                                                                  console.log('-------------------------------');
    let sum = sumOut;
    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    const findAmount = (sum) => {                                                                     console.log('sum', sum);
      // получил номинал меньший или равный сумме
      const amount = amountsArr.filter((x) => x <= sum)
        .pop();                                    
                                                 
      // console.log('amount', amount, typeof(amount), amount.pop());
      cash = getMoneyFromDrawer(cash, amount, amounts[amount]);
      if (cash) {               
        putChange(amounts[amount], parseFloat(amount));
        return true;
      } else {
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
      result = { status: 'INSUFFICIENT_FUNDS', change: [] };
      console.log('result ------');
      
      return;
    }
    // compare required change with prepared change
    console.log('sumInput', sumInput);
    console.log('getBalance(result.change)', getBalance(result.change));
    
    const diff = (sumInput - getBalance(result.change)).toFixed(2);                                          console.log('diff', diff);
    if (diff > 0) {
      getChange(diff, cash);
    }                                                                                                       console.log('-------------------------------');
    return result;
  };
  return getChange(sumInput, cashInput);
};


console.log(checkCashRegister(19.5, 20, [
  ['PENNY', 0.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 5],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]));
