import React from "react";

const Input = ({ value, id, onChange, label, type = "text", description }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      value={value || ""}
      id={id}
      onChange={onChange}
    />
    {description && <span className="field-hint">{description}</span>}
  </div>
);

export default Input;
