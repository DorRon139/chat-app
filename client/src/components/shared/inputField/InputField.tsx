import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
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
}: inputProps) => {
  const lang: string = useSelector((state: RootState) => state.general.lang); // TODO: redux
  return (
    <>
      <div className="input-group">
        {required ? (
          <input
            id={id}
            className={`${lang === "he" ? "he" : ""}`}
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
        {label && (
          <label className={`${lang === "he" ? "he" : ""}`} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </>
  );
};
export default InputField;
