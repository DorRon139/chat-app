import React from "react";
import "./input.css";

interface inputProps {
  id: string;
  value?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({
  id,
  value,
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: inputProps) => (
  <>
    <div className="input-group">
      {required ? (
        <input
          id={id}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      <span className="bar"></span>
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  </>
);

export default InputField;
