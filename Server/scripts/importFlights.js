const Flight = require('../models/Flight');
const flightData = require('../../flight.json');

async function importFlights(db) {
    try {
        // Clear existing flights (optional)
        await Flight.deleteMany({});
        console.log('Cleared existing flights');

        // Import all flights
        const result = await Flight.insertMany(flightData);
        console.log(`Successfully imported ${result.length} flights`);

    } catch (error) {
        console.error('Error importing flights:', error);
        throw error; // Propagate error to server.js
    }
}

module.exports = importFlights;