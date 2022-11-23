const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.URI);
        console.log(`MongoDB has connected successfully: ${connection.connection.host}`.bgCyan.underline);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB