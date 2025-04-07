import { faker } from "@faker-js/faker";
 const generateOfflineRecords = ({numRecords,event_name}) => {
    // Define the CSV headers
    const headers = [
      'email',
      'fn',
      'ln',
      'country',
      'doby',
      'gen',
      'age',
      'event_name',
      'event_time'
    ];
    // Generate the CSV data
    const csvRows = [];
    for (let i = 0; i < numRecords; i++) {
      const record = {
        email: faker.internet.email(),
        fn: faker.name.firstName(),
        ln: faker.name.lastName(),
        country: faker.address.countryCode(),
        doby: faker.date.past().getFullYear() - Math.floor(Math.random() * 50), // Random year between 50 years ago and now
        gen: Math.random() < 0.5 ? 'F' : 'M', // Randomly select F or M
        age: Math.floor(Math.random() * 80) + 18, // Random age between 18 and 98
        event_name: 'Purchase',
        event_time: new Date(faker.date.recent()).toISOString()
      };
      csvRows.push(Object.values(record));
    }
    // Add the headers to the CSV data
    csvRows.unshift(headers);
    // Convert the CSV data to a string
    const csvString = csvRows.map(row => row.join(',')).join('\n');
    // Set the CSV data state
  
    // Create a blob with the CSV data
    const blob = new Blob([csvString], { type: 'text/csv' });
    // Create a link to download the CSV file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.csv';
    a.click();
    // Clean up
    URL.revokeObjectURL(url);

  };

export default generateOfflineRecords