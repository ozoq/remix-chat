import { useField } from "remix-validated-form";
import { useEffect } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setError?: (error: string | undefined) => void;
}

export default function Input({ name, setError, ...otherProps }: InputProps) {
  const { error, getInputProps } = useField(name);

  useEffect(() => {
    setError?.(error);
  }, [setError, error]);

  return <input {...otherProps} {...getInputProps()} />;
}
