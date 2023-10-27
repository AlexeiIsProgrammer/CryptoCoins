import React from 'react';
import InputProps from './types/types';
import styles from './Input.module.scss';

export default function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <div className={styles.input}>
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
