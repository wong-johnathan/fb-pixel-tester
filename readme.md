# Signal, Pixel, Catalog Tester
==========================

A ReactJS tool for testing Meta Pixel and CAPI payloads, generating offline custom events, and creating catalog CSV files.

## Table of Contents
-----------------

* [Getting Started](#getting-started)
* [Requirements](#requirements)
* [Catalog Link Setup](#catalog-link-setup)
* [Cloning the Project](#cloning-the-project)

## Getting Started
---------------

This tool is designed to test both pixel and CAPI payload, generate offline custom events, and create catalog CSV files. All data is stored locally using `localStorage`, so your pixel ID, access token, and other sensitive information remain secure.

### Note:

If no **Event Test Code** is present, the pixel will send data as per normal.

## Requirements
------------

To use this tool, you'll need the following:

1. **Meta Pixel ID**
2. **Access Token**
3. **Event Test Code (Optional)**
4. **Catalog Link (Optional)**

## Catalog Link Setup
-------------------

To set up a catalog link, follow these steps:

1. **Generate Catalog**: Create a new catalog.
2. **Upload to Google Sheets**: Upload your catalog to Google Sheets.
3. **Publish as CSV**: Publish your catalog as a CSV file.
4. **Copy and Paste Link**: Copy the link and paste it into the **Catalog Link** field.

## Cloning the Project
--------------------

To clone this project, simply click the "Remix to Edit" button, and you'll be given your own copy. Alternatively, you can safely use this website, but you'll need to whitelist it to start receiving pixel data.

By following these steps, you'll be able to effectively test your Meta Pixel and CAPI payloads, generate offline custom events, and create catalog CSV files using this ReactJS tool.