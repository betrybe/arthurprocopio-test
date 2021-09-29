import React from 'react';
import PropTypes from 'prop-types';
import './AddExpenseForm.css';
import TextField from './FormFields/TextField';

function AddExpenseForm(props) {
  const {
    handleSubmit,
    handleChange,
    formState,
    currencies,
  } = props;
  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));
  const errorText = (field) => (formState.errors[field] ? formState.errors[field][0] : '');

  return (
    <form
      className="row align-items-center justify-content-center bg-dark text-white"
      onSubmit={ handleSubmit }
    >
      <div className="col-auto">
        <TextField
          type="number"
          className="form-control"
          id="value-input"
          dataTestId="value-input"
          placeholder="0"
          label="Valor: "
          name="value"
          onChange={ handleChange }
          value={ formState.values.value || '' }
          hasError={ hasError('value') }
          errorText={ errorText('value') }
          required
        />
      </div>
      <div className="col-auto">
        <label htmlFor="currency-input">
          Moeda:
          <br />
          <select
            className="form-select"
            id="currency-input"
            name="currency"
            onChange={ handleChange }
            value={ formState.values.currency || '' }
            data-testid="currency-input"
          >
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="col-auto">
        <label htmlFor="method-input">
          Método de pagamento:
          <br />
          <select
            className="form-select"
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ handleChange }
            value={ formState.values.method || '' }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
      <div className="col-auto">
        <label htmlFor="tag-input">
          Tag:
          <br />
          <select
            className="form-select"
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ handleChange }
            value={ formState.values.tag || '' }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
      <div className="col-auto">
        <TextField
          type="text"
          id="description-input"
          name="description"
          onChange={ handleChange }
          value={ formState.values.description || '' }
          dataTestId="description-input"
          hasError={ hasError('description') }
          errorText={ errorText('description') }
          label="Descrição: "
        />
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-primary"
        >
          Adicionar despesa
        </button>
      </div>
    </form>
  );
}

AddExpenseForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    isValid: PropTypes.bool,
    values: PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
    }),
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddExpenseForm;
