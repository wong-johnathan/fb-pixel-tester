const Input = ({
  value,
  id,
  onChange,
  label,
  type = "text",
  minWidth = null,
}) => (
  <div style={{ display: "flex", columnGap: "0.25rem" }}>
    <label style={{ cursor: "pointer", minWidth }} htmlFor={id}>
      {label}:
    </label>
    <input type={type} value={value || ""} id={id} onChange={onChange} />
  </div>
);

export default Input;
