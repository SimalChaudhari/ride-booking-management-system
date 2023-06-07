import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';

function Button({ text, onClick, className, type="button", addClass, icon='' }) {

  const buttonStyles = {
    display: 'inline-block',
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '2px 3px 1px 6px',
    cursor: 'pointer',
  };

  // Apply custom class styles based on the provided className prop
  if (className === 'primary') {
    buttonStyles.backgroundColor = '#007bff';
    buttonStyles.color = '#fff';
  } else if (className === 'danger') {
    buttonStyles.backgroundColor = '#dc3545';
    buttonStyles.color = '#fff';
  } else if (className === 'success') {
    buttonStyles.backgroundColor = '#28a745';
    buttonStyles.color = '#fff';
  }

  return (
    <button type={type} style={buttonStyles} onClick={onClick} className={addClass}>
    {icon && <SvgIcon component={icon} inheritViewBox />}
      <span>
        {text} 
      </span>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
