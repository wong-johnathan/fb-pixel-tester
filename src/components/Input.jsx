import React from "react";

const Input = ({
  value,
  id,
  onChange,
  label,
  type = "text",
  minWidth = "150px",
  description,
}) => (
  <React.Fragment>
    <div
      style={{
        display: "flex",
        columnGap: "0.25rem",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", columnGap: "0.25rem", width: "100%" }}>
        <label style={{ cursor: "pointer", minWidth }} htmlFor={id}>
          {label}:
        </label>
        <input
          type={type}
          value={value || ""}
          id={id}
          onChange={onChange}
          style={{ flex: 1 }}
        />
      </div>
      <span style={{ fontStyle: "italic", fontSize: "0.75rem", textAlign:"center" }}>
        {description}
      </span>
    </div>
  </React.Fragment>
);

export default Input;
