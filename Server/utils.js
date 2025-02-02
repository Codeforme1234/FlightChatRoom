const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        // Test the connection
        await mongoose.connection.db.admin().ping();
        console.log('Connected to MongoDB successfully');
        return mongoose.connection;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

module.exports = connectToDatabase; 
