import Input from "./Input";

export const ConfigInput = ({ state, handleUpdate }) => {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        marginBottom: "0.5rem",
        justifyItems: "center",
        alignItems: "center",
        // gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
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
    </div>
  );
};
