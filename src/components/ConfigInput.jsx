import Input from "./Input";

export const ConfigInput = ({ state, handleUpdate }) => {
  return <div
    style={{
      display: "flex",
      columnGap: "1rem",
      marginBottom: "0.5rem",
      justifyContent: "center",
    }}
  >
    <Input
      id="accessToken"
      onChange={handleUpdate}
      value={state.accessToken}
      label="Access Token"
    />
    <Input
      id="pixelId"
      onChange={handleUpdate}
      value={state.pixelId}
      label="Pixel Id"
    />
    <Input
      id="testEventCode"
      onChange={handleUpdate}
      value={state.testEventCode}
      label="Event Test Code"
    />
    <Input
      id="capiURL"
      onChange={handleUpdate}
      value={state.capiURL}
      label="CAPI URL"
    />
  </div>;
};
