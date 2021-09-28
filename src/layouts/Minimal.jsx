import React from 'react';
import PropTypes from 'prop-types';

function Minimal(props) {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
}

Minimal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Minimal;
