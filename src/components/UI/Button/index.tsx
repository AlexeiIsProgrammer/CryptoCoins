import React from 'react';
import styles from './Button.module.scss';
import ButtonProps from './types/types';

export default function Button({
  placeholder,
  children = '',
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      placeholder={placeholder}
      onClick={onClick}
      className={styles.button}
      type="button"
    >
      {children}
    </button>
  );
}
