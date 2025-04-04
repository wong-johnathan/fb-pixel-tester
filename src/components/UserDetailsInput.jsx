import { faker } from "@faker-js/faker";
import { userInfoFieldsJson } from "../config/userInfoJson";
import Input from "./Input";

const UserDetailsInput = ({ onChange, userInfo, setUserInfo }) => {
  const handleRandomGenerate = () => {
    setUserInfo({
      em: faker.internet.email(),
      fn: faker.person.firstName(),
      ln: faker.person.lastName(),
      ph: faker.number.int({ min: 8, max: 15 }),
      external_id: faker.string.uuid(),
    });
  };
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
        <button style={{ width: "100%" }} onClick={handleRandomGenerate}>
          Generate Random
        </button>
      </div>
      <button style={{ minWidth: "250px" }} onClick={() => setUserInfo({})}>
        Delete
      </button>
    </div>
  );
};
export default UserDetailsInput;
