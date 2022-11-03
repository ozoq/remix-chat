import { useState } from "react";
import Input from "./Input";

export interface StyledInputProps {
  name: string;
  label: string;
}

export default function StyledInput({ name, label }: StyledInputProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Input
        name={name}
        placeholder={label}
        className="input input-bordered w-full"
        setError={setError}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
