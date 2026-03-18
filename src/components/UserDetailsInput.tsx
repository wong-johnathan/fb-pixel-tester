import { ChangeEvent } from "react";
import { faker } from "@faker-js/faker";
import { userInfoFieldsJson } from "../config/userInfoJson";
import Input from "./Input";
import type { UserInfo } from "../types";

interface UserDetailsInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

const UserDetailsInput = ({ onChange, userInfo, setUserInfo }: UserDetailsInputProps) => {
  const handleRandomGenerate = () => {
    setUserInfo({
      em: faker.internet.email(),
      fn: faker.person.firstName(),
      ln: faker.person.lastName(),
      ph: faker.number.int({ min: 11111111, max: 999999999999999 }),
      external_id: faker.string.uuid(),
    });
  };

  return (
    <div className="card">
      <p className="card-title">
        User Info{" "}
        <span style={{ fontWeight: 400, textTransform: "none", fontSize: "0.72rem" }}>
          (optional — hashed before sending)
        </span>
      </p>
      <div className="field-grid">
        {userInfoFieldsJson.map((field) => (
          <Input
            key={field.label}
            onChange={onChange}
            id={field.parameter}
            label={field.label}
            value={String(userInfo[field.parameter] ?? "")}
          />
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={handleRandomGenerate}>Generate Random</button>
        <button className="btn btn-ghost" onClick={() => setUserInfo({})}>Clear</button>
      </div>
    </div>
  );
};

export default UserDetailsInput;
