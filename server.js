const express = require('express');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});