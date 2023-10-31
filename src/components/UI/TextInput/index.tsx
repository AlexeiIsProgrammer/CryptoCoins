import TextInputProps from './types/types';
import styles from './TextInput.module.scss';

export default function TextInput({
  placeholder,
  value,
  onChange,
}: TextInputProps) {
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
