import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import LoginForm from '../components/LoginForm';
import { authenticate } from '../actions';
import './Login.css';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'Por favor, insira um email' },
    email: {
      message: 'Por favor insira um email valido',
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'Por favor, insira uma senha' },
    length: {
      minimum: 6,
      message: 'Senha precisa ter no mínimo 6 caractéres',
    },
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      values: {
        email: '',
        password: '',
      },
      touched: {},
      errors: {},
    };

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { values } = this.state;
    const { onAuthSubmit } = this.props;
    onAuthSubmit(values.email);
  }

  handleChangeForm(event) {
    event.preventDefault();
    const { values, touched } = this.state;
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    const newTouched = {
      ...touched,
      [event.target.name]: true,
    };
    const errors = validate(newValues, schema, { fullMessages: false });
    this.setState({
      isValid: !errors,
      values: {
        ...newValues,
      },
      touched: {
        ...newTouched,
      },
      errors: errors || {},
    });
  }

  render() {
    const { values, touched, errors, isValid } = this.state;
    const { isLoading, isAuthenticated } = this.props;
    return (
      <>
        {isAuthenticated && <Redirect to="/carteira" /> }
        <div className="wraper">
          <div className="form-container text-center">
            <LoginForm
              handleSubmit={ this.handleSubmit }
              handleChange={ this.handleChangeForm }
              formState={ {
                isValid,
                values,
                touched,
                errors,
              } }
              isLoading={ isLoading }
            />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit: (email) => {
    dispatch(authenticate({ email }));
  },
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.user.state === 'loading',
});

Login.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
