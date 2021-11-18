function validateNumber({ message }, value) {
  if (/^-?\d+$/.test(value)) {
    return undefined;
  }
  return message;
}

function validateEmail({ message }, value) {
  if (/^([a-z\d.]+)@([a-z\d-]+)\.([a-z]+)$/.test(value.toLowerCase())) {
    return undefined;
  }
  return message;
}

function validateLength({ minimum, message }, value) {
  if (typeof value !== 'string') {
    return message;
  }
  if (value.length >= minimum) {
    return undefined;
  }
  return message;
}

function validatePresence({ allowEmpty, message }, value) {
  if (allowEmpty) {
    return undefined;
  }
  if (value) {
    return undefined;
  }
  return message;
}

function executeValidation(validateResponse, response, schemaKey) {
  if (validateResponse !== undefined) {
    if (typeof response[schemaKey] !== 'object') {
      response[schemaKey] = [validateResponse];
    } else {
      response[schemaKey].push(validateResponse);
    }
  }
  return response;
}

function validate(values, schema) {
  let response = {};
  Object.keys(schema).forEach((schemaKey) => {
    if (Object.prototype.hasOwnProperty.call(schema[schemaKey], 'presence')) {
      const validateResponse = validatePresence(
        schema[schemaKey].presence,
        values[schemaKey],
      );
      response = executeValidation(validateResponse, response, schemaKey);
    }

    if (Object.prototype.hasOwnProperty.call(schema[schemaKey], 'email')) {
      const validateResponse = validateEmail(
        schema[schemaKey].email,
        values[schemaKey],
      );
      response = executeValidation(validateResponse, response, schemaKey);
    }

    if (Object.prototype.hasOwnProperty.call(schema[schemaKey], 'numericality')) {
      const validateResponse = validateNumber(
        schema[schemaKey].numericality,
        values[schemaKey],
      );
      response = executeValidation(validateResponse, response, schemaKey);
    }

    if (Object.prototype.hasOwnProperty.call(schema[schemaKey], 'length')) {
      const validateResponse = validateLength(
        schema[schemaKey].length,
        values[schemaKey],
      );
      response = executeValidation(validateResponse, response, schemaKey);
    }
  });

  if (Object.keys(response).length === 0) {
    return null;
  }
  return response;
}

export default validate;
