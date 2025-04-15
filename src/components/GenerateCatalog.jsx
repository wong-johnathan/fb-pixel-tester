import React, { useState } from "react";
import generateCatalog from "../utils/generateCatalog";
import Input from './Input'
const GenerateCatalog = () => {
  const [numRecords, setNumRecords] = useState(300);

  return (
    <div style={{ display: "flex", flexDirection: "column",
          maxWidth: "800px", }}>
      <h4>Catalog CSV Generator</h4>
      <div
        style={{
          display: "flex",
          width: "100%",
          columnGap: "0.5rem",
            justifyContent:"center"
        }}
      >
        
        <input
          style={{ width:"150px" }}
          type="number"
          value={numRecords}
          onChange={(e) => setNumRecords(e.target.value)}
        />
        <button onClick={() => generateCatalog(numRecords)}>
          Generate Catalog
        </button>
      </div>
    </div>
  );
};

export default GenerateCatalog;
