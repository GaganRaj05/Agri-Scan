const mongoose = require('mongoose');

async function connectToDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Mongo db connection successfull");
    }
    catch(err) {
        console.log(err.message);
        console.log("Mongo db connection failed");
    }
}

module.exports = connectToDB;
