// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's schema structure which means that each user will have the following 
// data elements
const UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Password: String,
    Email: String,
    LoggedIn: Boolean,
    Friends: Array,
    Posts: Array
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("users", UserSchema);