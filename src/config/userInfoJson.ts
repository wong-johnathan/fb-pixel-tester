import type { UserInfoField } from "../types";

export const userInfoFieldsJson: UserInfoField[] = [
  { parameter: "em", label: "Email", type: "email" },
  { parameter: "fn", label: "First Name" },
  { parameter: "ln", label: "Last Name" },
  { parameter: "ph", label: "Phone Number", type: "number" },
  { parameter: "external_id", label: "External ID" },
];
