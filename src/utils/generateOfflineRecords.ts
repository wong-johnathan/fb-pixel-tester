import { faker } from "@faker-js/faker";
import { fbEvents } from "../config/fbEvents";

interface GenerateOfflineRecordsParams {
  numRecords: number;
  eventType: string;
  catalogContentIDs?: string[];
}

const generateOfflineRecords = ({
  numRecords,
  eventType,
  catalogContentIDs = [],
}: GenerateOfflineRecordsParams): void => {
  const getRandomCatalogID = (): string => {
    if (catalogContentIDs.length === 0) return faker.string.uuid();
    const randomIndex = Math.floor(Math.random() * catalogContentIDs.length);
    return catalogContentIDs[randomIndex];
  };

  const headers = [
    "email", "fn", "ln", "country", "doby", "gen", "age",
    "event_name", "event_time",
  ];

  const event = fbEvents.find((fbEvent) => fbEvent.name === eventType);
  if (!event) return;

  headers.push(...(event.parameters ?? []).map((p) => p.name));

  const csvRows: (string | number)[][] = [];
  for (let i = 0; i < numRecords; i++) {
    const record: Record<string, string | number> = {
      email: faker.internet.email(),
      fn: faker.person.firstName(),
      ln: faker.person.lastName(),
      country: faker.location.countryCode(),
      doby: faker.date.past().getFullYear() - Math.floor(Math.random() * 50),
      gen: Math.random() < 0.5 ? "F" : "M",
      age: Math.floor(Math.random() * 80) + 18,
      event_name: eventType,
      event_time: new Date(faker.date.recent()).toISOString(),
    };

    (event.parameters ?? []).forEach(({ name, type }) => {
      if (name === "currency") record[name] = "USD";
      else if (name === "content_type") record[name] = "product";
      else if (name === "content_ids") record[name] = getRandomCatalogID();
      else if (type === "string") record[name] = faker.string.uuid();
      else record[name] = Math.floor(Math.random() * 99) + 1;
    });

    csvRows.push(Object.values(record));
  }

  csvRows.unshift(headers);
  const csvString = csvRows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "offlineRecord.csv";
  a.click();
  URL.revokeObjectURL(url);
};

export default generateOfflineRecords;
