type TextInputProps = {
  placeholder?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
};

export default TextInputProps;
