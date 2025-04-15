import { faker } from "@faker-js/faker";
import fs from "fs";

const generateCatalog = ({ numRecords }) => {
  // Define the CSV headers
  const headers = [
    "id",
    "title",
    "description",
    "availability",
    "condition",
    "price",
    "link",
    "image_link",
    "brand",
    "quantity_to_sell_on_facebook",
    "sale_price",
  ];

  // Generate the CSV data
  const csvData = [];
  for (let i = 0; i < numRecords; i++) {
    const price = `${faker.commerce.price({ min: 10, max: 300 })} USD`;
    const id = faker.string.uuid();
    const record = {
      id,
      title: faker.commerce.productName().replaceAll(",", ""),
      description: faker.commerce.productDescription().replaceAll(",", ""),
      availability: "in stock",
      condition: "new",
      price: price,
      link: `https://gossamer-outgoing-advantage.glitch.me/product/${id}`,
      image_link: faker.image.urlPicsumPhotos(),
      brand: "John",
      quantity_to_sell_on_facebook: faker.number.int(100),
      sale_price: price,
    };
    csvData.push(Object.values(record));
  }

  // Add the headers to the CSV data
  csvData.unshift(headers);

  // Convert the CSV data to a string
  const csvString = csvData.map((row) => row.join(",")).join("\n");

  // Export the CSV file
    // Create a blob with the CSV data
  const blob = new Blob([csvString], { type: "text/csv" });
  // Create a link to download the CSV file
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "catalog.csv";
  a.click();
  // Clean up
  URL.revokeObjectURL(url);
};

export default generateCatalog