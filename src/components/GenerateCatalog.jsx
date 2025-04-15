import React, { useState } from "react";
import generateCatalog from "../utils/generateCatalog";
import Input from "./Input";
const GenerateCatalog = () => {
  const [numRecords, setNumRecords] = useState(300);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "800px" }}
    >
      <h4>Catalog CSV Generator</h4>
      <div
        style={{
          display: "flex",
          maxWidth: "500px",
          columnGap: "0.5rem",
            flexDirection:"column",
              rowGap:"0.5rem",
                alignSelf:"center"
        }}
      >
        <Input
          label="Number of Records"
          onChange={(e) => setNumRecords(e.target.value)}
          value={numRecords}
          id="record"
        />

        <button onClick={() => generateCatalog({numRecords})}>
          Generate Catalog
        </button>
      </div>
    </div>
  );
};

export default GenerateCatalog;
