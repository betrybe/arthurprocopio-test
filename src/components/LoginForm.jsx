import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';
import TextField from './TextField';

function LoginForm(props) {
  const {
    handleSubmit,
    handleChange,
    formState,
    isLoading,
  } = props;
  const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));
  const errorText = (field) => (formState.errors[field] ? formState.errors[field][0] : '');
  return (
    <form className="form-signin" onSubmit={ handleSubmit }>
      {/* TODO add image <img className="mb-4" src="" alt="" width="72" height="72" /> */}
      <TextField
        type="email"
        id="inputEmail"
        name="email"
        placeholder="Email"
        onChange={ handleChange }
        value={ formState.values.email || '' }
        dataTestId="email-input"
        hasError={ hasError('email') }
        errorText={ errorText('email') }
        required
      />
      <TextField
        type="password"
        id="inputPassword"
        name="password"
        placeholder="Senha"
        onChange={ handleChange }
        value={ formState.values.password || '' }
        dataTestId="password-input"
        hasError={ hasError('password') }
        errorText={ errorText('password') }
        required
      />
      {
        isLoading && <div className="spinner-border" role="status" />
      }
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        disabled={ !formState.isValid || isLoading }
      >
        Entrar
      </button>
    </form>
  );
}

LoginForm.defaultProps = {
  isLoading: false,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    isValid: PropTypes.bool,
    values: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  isLoading: PropTypes.bool,
};

export default LoginForm;
