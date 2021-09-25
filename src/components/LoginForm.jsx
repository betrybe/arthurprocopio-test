import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

function LoginForm(props) {
  const {
    handleSubmit,
    handleChange,
    formValues,
  } = props;
  return (
    <form className="form-signin" onSubmit={ handleSubmit }>
      {/* TODO add image <img className="mb-4" src="" alt="" width="72" height="72" /> */}
      <h1 className="h3 mb-3 font-weight-normal">Entrar</h1>
      <input
        type="email"
        id="inputEmail"
        name="email"
        className="form-control"
        placeholder="Email"
        onChange={ handleChange }
        value={ formValues.email || '' }
        data-testid="email-input"
        required
      />
      <input
        type="password"
        id="inputPassword"
        name="password"
        className="form-control"
        placeholder="Senha"
        onChange={ handleChange }
        value={ formValues.password || '' }
        data-testid="password-input"
        required
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default LoginForm;
