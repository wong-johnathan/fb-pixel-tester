# Signal, Pixel, Catalog Tester

==========================

A ReactJS tool for testing Meta Pixel and CAPI payloads, generating offline custom events, and creating catalog CSV files.

## Table of Contents

---

- Getting Started
- Requirements
- Features
- Catalog Link Setup
- Cloning the Project

## Getting Started

---

This tool is designed to test both pixel and CAPI payload, generate offline custom events, and create catalog CSV files. All data is stored locally using `localStorage`, so your pixel ID, access token, and other sensitive information remain secure.

### Note:

If no **Event Test Code** is present, the pixel will send data as per normal.

## Requirements

---

To use this tool, you'll need the following:

1. **Meta Pixel ID**
2. **Access Token**
3. **Event Test Code (Optional)**
4. **Catalog Link (Optional)**

## Features

---

- **Generate Random**: Randomly generates PII data to be sent along with any CAPI or pixel data.
- **Clear User Info**: Removes all PII data, ensuring any pixel or CAPI data is sent without PII.
- **Send Pixel Event**: Triggers a browser event to be sent to your pixel.
- **Send CAPI**: Triggers a CAPI event to be sent to your pixel.
- **Send Both**: Triggers both a browser and CAPI event to be sent to your pixel.
- **Random URL**: Redirects the user to a random URL, allowing the same type of event to be sent from different URLs within the test website (e.g., ViewContent in `/abcd` & ViewContent in `/efgh`).
- **Go to Random Catalog Item**: Once a catalog link is provided, this button appears. Clicking it redirects the user to a random catalog item within the feed.

Example Catalog Link: <em>https://docs.google.com/spreadsheets/d/e/2PACX-1vSpRjt0z1aUeaFGcUiz5RTx3mnc57pGCCCUnIAV0oLPKlf68knWu62L7EUcwXqgf_9DjIdEdPVuIaj8/pub?gid=0&single=true&output=csv</em>

## Catalog Link Setup

---

To set up a catalog link, follow these steps:

1. **Generate Catalog**: Create a new catalog.
2. **Upload to Google Sheets**: Upload your catalog to Google Sheets.
3. **Publish as CSV**: Publish the sheet as a CSV file.
4. **Copy and Paste Link**: Copy the link and paste it into the **Catalog Link** field.

---

## Catalog CSV Generator

This feature generates three CSV files:

1. **catalog.csv**: This is the main catalog file.
2. **catalog_Malay.csv**: This file serves as a supplementary feed in Bahasa.
3. **catalog_Filipino.csv**: This file serves as a supplementary feed in Filipino.

These files can be used to manage and test different catalog feeds effectively.

## Cloning the Project

---

To clone this project, simply click the "Remix to Edit" button, and you'll be given your own copy. Alternatively, you can safely use this website, but you'll need to whitelist it to start receiving pixel data.

By following these steps, you'll be able to effectively test your Meta Pixel and CAPI payloads, generate offline custom events, and create catalog CSV files using this ReactJS tool.
