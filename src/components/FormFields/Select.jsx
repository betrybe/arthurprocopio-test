import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const {
    type,
    id,
    name,
    placeholder,
    onChange,
    value,
    dataTestId,
    required,
    hasError,
    errorText } = props;
  return (
    <div className="input-group has-validation">
      <input
        type={ type }
        id={ id }
        name={ name }
        className={ `form-control${hasError ? ' is-invalid' : ''}` }
        placeholder={ placeholder }
        onChange={ onChange }
        value={ value }
        data-testid={ dataTestId }
        required={ required }
      />
      {
        hasError
        && <div className="invalid-feedback">{errorText}</div>
      }
    </div>
  );
}

Select.defaultProps = {
  type: 'text',
  id: null,
  name: null,
  placeholder: '',
  onChange: null,
  value: '',
  dataTestId: '',
  required: false,
  hasError: false,
  errorText: '',
};

Select.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  dataTestId: PropTypes.string,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
};

export default Select;
