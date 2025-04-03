import { userInfoFieldsJson } from "../config/userInfoJson";
import Input from "./Input";

const UserDetailsInput = ({ onChange, userInfo, setUserInfo }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "0.5rem",
        width: "100%",
      }}
    >
      <span>User Info: (Optional):</span>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginBottom: "0.5rem",
          justifyItems: "center",
          alignItems: "center",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        {userInfoFieldsJson.map((field) => (
          <Input
            key={field.label}
            onChange={onChange}
            id={field.parameter}
            label={field.label}
            value={userInfo[field.parameter]}
          />
        ))}
      </div>
      <button style={{ minWidth: "250px" }} onClick={() => setUserInfo({})}>
        Delete
      </button>
    </div>
  );
};
export default UserDetailsInput;
