import type { User } from "@prisma/client";
import { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useControlField, useField } from "remix-validated-form";

export interface UsersAutocompleteProps {
  users: User[];
  inputName: string;
  label: string;
}

// This is bad, in context of "where should the <input> be" (ok not relevant any more but still consider)
// In general is is a "speed-run" bad component
// Ohhh and on top of this MANUAL STYLING, please
// And I cannot set the input name attribute???
export default function UsersAutocomplete({
  users,
  inputName,
  label,
}: UsersAutocompleteProps) {
  const { error, getInputProps, validate } = useField(inputName);
  const [value, setValue] = useControlField<string>(inputName);

  function setInputValue(value: string) {
    setValue(value);
    validate();
  }

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <ReactSearchAutocomplete<User>
        items={users}
        onSearch={(value) => setInputValue(value)}
        onSelect={(user) => setInputValue(user.name)}
        styling={{
          backgroundColor: "#2A303C",
          color: "#A6ADBA",
          border: "1px solid #434955",
          borderRadius: "8px",
          hoverBackgroundColor: "#242933",
        }}
      />
      <input hidden value={value} {...getInputProps()}></input>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}
