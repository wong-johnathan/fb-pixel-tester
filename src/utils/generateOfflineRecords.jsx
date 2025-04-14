import { faker } from "@faker-js/faker";
import { fbEvents } from "../config/fbEvents";
import { useContext } from "react";
const generateOfflineRecords = ({
  numRecords,
  eventType,
  catalogContentIDs = [],
}) => {
  const getRandomCatalogID = () => {
    if (catalogContentIDs.length === 0) return faker.string.uuid();
    console.log("Getting random index")
    const randomIndex = Math.floor(Math.random() * catalogContentIDs.length);
    const catalogID = catalogContentIDs[randomIndex];
    return catalogID
  };
  // Define the CSV headers
  const headers = [
    "email",
    "fn",
    "ln",
    "country",
    "doby",
    "gen",
    "age",
    "event_name",
    "event_time",
  ];

  const event = fbEvents.find((fbEvent) => fbEvent.name === eventType);
  headers.push(...event.parameters.map((event) => event.name));
  // Generate the CSV data
  const csvRows = [];
  for (let i = 0; i < numRecords; i++) {
    const record = {
      email: faker.internet.email(),
      fn: faker.person.firstName(),
      ln: faker.person.lastName(),
      country: faker.location.countryCode(),
      doby: faker.date.past().getFullYear() - Math.floor(Math.random() * 50), // Random year between 50 years ago and now
      gen: Math.random() < 0.5 ? "F" : "M", // Randomly select F or M
      age: Math.floor(Math.random() * 80) + 18, // Random age between 18 and 98
      event_name: eventType,
      event_time: new Date(faker.date.recent()).toISOString(),
    };
    event.parameters.forEach(({ name, type }) => {
      if (name === "currency") record[name] = "USD";
      else if (name === "content_type") record[name] = "product";
      else if (name === "content_ids") record[name] = getRandomCatalogID();
      else if (type === "string") record[name] = faker.string.uuid();
      else record[name] = Math.floor(Math.random() * 99) + 1;
    });
    csvRows.push(Object.values(record));
  }
  // Add the headers to the CSV data
  csvRows.unshift(headers);
  // Convert the CSV data to a string
  const csvString = csvRows.map((row) => row.join(",")).join("\n");
  // Set the CSV data state

  // Create a blob with the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });
  // Create a link to download the CSV file
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.csv";
  a.click();
  // Clean up
  URL.revokeObjectURL(url);
};

export default generateOfflineRecords;
