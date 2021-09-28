import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ExpensesTable() {
  const wallet = useSelector((state) => state.wallet);
  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          wallet.state === 'loading'
          && <tr><td colSpan="7"><div className="spinner-border" role="status" /></td></tr>
        }
        {wallet.expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>
              { (expense.value * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                className="btn btn-secondary"
                // disabled={ !formState.isValid || isLoadingCurrencies }
                data-testid="edit-btn"
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                // disabled={ !formState.isValid || isLoadingCurrencies }
                data-testid="delete-btn"
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpensesTable;
