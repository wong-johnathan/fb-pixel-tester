import generateOfflineRecords from "../utils/generateOfflineRecords";
import Input from "./Input";
import React, { useState } from "react";
import { fbEvents } from "../config/fbEvents";
export const OfflineRecordGenerator = () => {
  const [numRecords, setNumRecords] = useState(10);
  const [eventType, setEventType] = useState("Purchase");
  const handleGenerateCSV = () => {
    generateOfflineRecords({ numRecords, eventType });
    alert("CSV Generated and downloaded");
  };
  return (
    <React.Fragment>
      <h4>Offline record generator</h4>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          marginBottom: "0.5rem",
          justifyItems: "center",
          alignItems: "center",
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Input
          value={numRecords}
          label="Number of records"
          type="number"
          onChange={(e) => setNumRecords(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            columnGap: "0.25rem",
            paddingBottom: "0.25rem",
            width: "100%",
          }}
        >
          <label htmlFor="eventType">Event Type:</label>
          <select
            id="eventType"
            onChange={(e) => setEventType(e.target.value)}
            value={eventType}
            style={{ height: "21.5px", flex: 1 }}
          >
            <option>Select event type</option>
            {fbEvents.map((event) => (
              <option key={event.name}>{event.name}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleGenerateCSV}>Generate CSV</button>
    </React.Fragment>
  );
};

export default OfflineRecordGenerator;
