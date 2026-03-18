import React, { useState } from "react";
import generateCatalog from "../utils/generateCatalog";
import Input from "./Input";

const GenerateCatalog = () => {
  const [numRecords, setNumRecords] = useState(300);

  return (
    <div className="card">
      <p className="card-title">Catalog CSV Generator</p>
      <div className="field-grid-1" style={{ maxWidth: 300 }}>
        <Input
          label="Number of records"
          onChange={(e) => setNumRecords(e.target.value)}
          value={numRecords}
          id="record"
          type="number"
        />
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={() => generateCatalog({ numRecords })}>
          Generate Catalog (EN / Bahasa / Tagalog)
        </button>
      </div>
    </div>
  );
};

export default GenerateCatalog;
