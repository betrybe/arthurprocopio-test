import React from 'react';
import PropTypes from 'prop-types';

function TextField(props) {
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
    errorText,
    label: labelText } = props;
  return (
    <div className="input-group has-validation">
      {labelText !== ''
        ? (
          <label htmlFor={ id }>
            {labelText}
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
          </label>
        )
        : (
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
        )}
      {
        hasError
        && <div className="invalid-feedback">{errorText}</div>
      }
    </div>
  );
}

TextField.defaultProps = {
  type: 'text',
  name: null,
  placeholder: '',
  onChange: null,
  value: '',
  dataTestId: '',
  required: false,
  hasError: false,
  errorText: '',
  label: '',
};

TextField.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataTestId: PropTypes.string,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
  label: PropTypes.string,
};

export default TextField;
