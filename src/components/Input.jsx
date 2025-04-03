const Input = ({
  value,
  id,
  onChange,
  label,
  type = "text",
  minWidth = "150px",
}) => (
  <div style={{ display: "flex", columnGap: "0.25rem", width:"100%" }}>
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
);

export default Input;
