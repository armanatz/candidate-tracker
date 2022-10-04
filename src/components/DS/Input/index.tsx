import { useState } from 'react';
import styles from './Input.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(inputProps: InputProps) {
  const { value, onChange } = inputProps;

  const [inputValue, setInputValue] = useState(value || '');

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (onChange) {
      return onChange(e);
    }

    return false;
  };

  return (
    <input
      {...inputProps}
      className={styles.input}
      value={inputValue}
      onChange={handleOnInputChange}
    />
  );
}

export default Input;
