import React, { ChangeEvent } from "react";

interface InputProps {
  value?: string | number;
  id?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
  description?: string;
}

const Input = ({ value, id, onChange, label, type = "text", description }: InputProps) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input type={type} value={value ?? ""} id={id} onChange={onChange} />
    {description && <span className="field-hint">{description}</span>}
  </div>
);

export default Input;
