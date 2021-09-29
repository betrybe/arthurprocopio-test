export const getTotalFromExpenses = (expenses) => {
  return Number(expenses.reduce((acumulator, actual) => {
    const exchangeRate = Number(actual.exchangeRates[actual.currency].ask);
    return acumulator + (Number(actual.value) * exchangeRate);
  }, 0)).toFixed(2)
};
