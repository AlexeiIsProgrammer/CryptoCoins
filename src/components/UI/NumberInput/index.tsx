import React from 'react';
import NumberInputProps from './types/types';
import styles from './NumberInput.module.scss';

export default function NumberInput({
  placeholder,
  value,
  onChange,
}: NumberInputProps) {
  return (
    <div className={styles.input}>
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        max={20}
        min={1}
        type="number"
      />
    </div>
  );
}
