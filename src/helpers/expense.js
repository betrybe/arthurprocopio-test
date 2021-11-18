const getTotalFromExpenses = (expenses) => (
  Number(expenses.reduce((acumulator, actual) => (
    acumulator + (
      Number(actual.value)
    * Number(actual.exchangeRates[actual.currency].ask)
    )
  ), 0)).toFixed(2)
);

export default getTotalFromExpenses;
