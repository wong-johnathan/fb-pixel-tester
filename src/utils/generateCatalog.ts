import { faker } from "@faker-js/faker";

interface GenerateCatalogParams {
  numRecords: number;
}

const generateCatalog = ({ numRecords }: GenerateCatalogParams): void => {
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

  const csvData: (string | number)[][] = [];
  for (let i = 0; i < numRecords; i++) {
    const price = `${faker.commerce.price({ min: 10, max: 300 })} USD`;
    const id = faker.string.uuid();
    const record = {
      id,
      title: faker.commerce.productName().replaceAll(",", ""),
      description: faker.commerce.productDescription().replaceAll(",", ""),
      availability: "in stock",
      condition: "new",
      price,
      link: `https://${window.location.hostname}/product/${id}`,
      image_link: faker.image.urlPicsumPhotos(),
      brand: "John",
      quantity_to_sell_on_facebook: faker.number.int(100),
      sale_price: price,
    };
    csvData.push(Object.values(record));
  }

  csvData.unshift(headers);
  const csvString = csvData.map((row) => row.join(",")).join("\n");
  downloadCsv(csvString, "catalog.csv");

  generateCatalogLanguageFeed(csvData, "ms", "ms_MY");
  generateCatalogLanguageFeed(csvData, "tl", "tl_XX");
};

const generateCatalogLanguageFeed = async (
  data: (string | number)[][],
  language: string,
  override: string,
): Promise<void> => {
  const headers = ["id", "title", "description", "override"];
  const csvData: (string | number)[][] = [];
  const translator = window.openGoogleTranslator;
  const languageName = translator.supportedLanguages()[language];
  const [, ...toTranslateData] = data;

  const titles = toTranslateData.map((tuple) => String(tuple[1]));
  const descriptions = toTranslateData.map((tuple) => String(tuple[2]));

  const translatedTitles = await translator.TranslateLanguageData({
    listOfWordsToTranslate: titles,
    fromLanguage: "en",
    toLanguage: language,
  });
  const translatedDescriptions = await translator.TranslateLanguageData({
    listOfWordsToTranslate: descriptions,
    fromLanguage: "en",
    toLanguage: language,
  });

  for (let i = 0; i < toTranslateData.length; i++) {
    csvData.push(
      Object.values({
        id: toTranslateData[i][0],
        title: translatedTitles[i].translation.replaceAll(",", ""),
        description: translatedDescriptions[i].translation.replaceAll(",", ""),
        override,
      }),
    );
  }

  csvData.unshift(headers);
  const csvString = csvData.map((row) => row.join(",")).join("\n");
  downloadCsv(csvString, `catalog_${languageName}.csv`, "text/csv; charset=utf-8");
};

const downloadCsv = (content: string, filename: string, mimeType = "text/csv"): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default generateCatalog;
