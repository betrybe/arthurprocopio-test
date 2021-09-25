import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import { authenticate } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onAuthSubmit = props.onAuthSubmit;
    this.isLoading = props.isLoading;

    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    this.onAuthSubmit(email);
  }

  handleChangeForm(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="wraper">
        <div className="form-container text-center">
          <LoginForm
            handleSubmit={ this.handleSubmit }
            handleChange={ this.handleChangeForm }
            formValues={ this.state }
            isLoading={ this.isLoading }
          />
        </div>
      </div>
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
  isLoading: state.user.loading,
});

Login.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
