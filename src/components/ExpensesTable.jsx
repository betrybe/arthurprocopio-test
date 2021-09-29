import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../actions';
import LoadingSpinner from './LoadingSpinner';

function ExpensesTable() {
  const wallet = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

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
          && <tr><td colSpan="7"><LoadingSpinner /></td></tr>
        }
        {wallet.expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name || '0' }</td>
            <td>
              { Number(expense.exchangeRates[expense.currency].ask || '0').toFixed(2) }
            </td>
            <td>
              { Number(Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask || '0')).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="edit-btn"
              >
                Editar
              </button>
              {' '}
              <button
                type="button"
                className="btn btn-danger"
                data-testid="delete-btn"
                onClick={ () => handleDelete(expense.id) }
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
