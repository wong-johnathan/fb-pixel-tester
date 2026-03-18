import generateOfflineRecords from "../utils/generateOfflineRecords";
import Input from "./Input";
import { useState, useContext, ChangeEvent } from "react";
import { fbEvents } from "../config/fbEvents";
import { MetaContext } from "../context/PixelContext";

const OfflineRecordGenerator = () => {
  const { state } = useContext(MetaContext);
  const [numRecords, setNumRecords] = useState(10);
  const [eventType, setEventType] = useState("Purchase");

  const handleGenerateCSV = () => {
    if (state.catalogContent.length === 0)
      window.alert("No catalog IDs found — this will generate a high mismatch with your catalog.");
    generateOfflineRecords({
      numRecords,
      eventType,
      catalogContentIDs: state.catalogContent.map((c) => c.id),
    });
    alert("CSV generated and downloaded");
  };

  return (
    <div className="card">
      <p className="card-title">Offline Event Generator</p>
      <div className="field-grid">
        <Input
          value={numRecords}
          label="Number of records"
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNumRecords(Number(e.target.value))}
        />
        <div className="field">
          <label htmlFor="offlineEventType">Event Type</label>
          <select
            id="offlineEventType"
            onChange={(e) => setEventType(e.target.value)}
            value={eventType}
          >
            <option>Select event type</option>
            {fbEvents.map((event) => (
              <option key={event.name}>{event.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={handleGenerateCSV}>Download CSV</button>
      </div>
    </div>
  );
};

export default OfflineRecordGenerator;
