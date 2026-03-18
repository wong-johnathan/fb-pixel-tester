import { ChangeEvent } from "react";
import Input from "./Input";
import type { MetaState } from "../types";

interface ConfigInputProps {
  state: MetaState;
  handleUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ConfigInput = ({ state, handleUpdate }: ConfigInputProps) => (
  <div className="card">
    <p className="card-title">Meta Configuration</p>
    <div className="field-grid">
      <Input id="pixelId" onChange={handleUpdate} value={state.pixelId} label="Pixel ID" />
      <Input id="testEventCode" onChange={handleUpdate} value={state.testEventCode} label="Event Test Code" />
      <Input id="accessToken" onChange={handleUpdate} value={state.accessToken} label="Access Token" />
      <Input id="catalogLink" onChange={handleUpdate} value={state.catalogLink} label="Catalog Link (CSV)" />
    </div>
  </div>
);
