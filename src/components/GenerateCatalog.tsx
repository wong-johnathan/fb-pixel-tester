import { useState, ChangeEvent } from "react";
import generateCatalog from "../utils/generateCatalog";
import Input from "./Input";

const GenerateCatalog = () => {
  const [numRecords, setNumRecords] = useState(300);

  return (
    <div className="card">
      <p className="card-title">Catalog CSV Generator</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.6rem" }}>
        <div style={{ width: 160 }}>
          <Input
            label="Number of records"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNumRecords(Number(e.target.value))}
            value={numRecords}
            id="record"
            type="number"
          />
        </div>
        <button className="btn btn-secondary" onClick={() => generateCatalog({ numRecords })}>
          Generate Catalog (EN / Bahasa / Tagalog)
        </button>
      </div>
    </div>
  );
};

export default GenerateCatalog;
