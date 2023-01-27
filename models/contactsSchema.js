const mongoose = require('mongoose')
const Schema = mongoose.Schema; // -> will define structure of DB

//instantiate and create a new schema for the DB structure
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mesName: {
        type: String,
        required: true
    },
    memo: {
        type: String,
        required: true
    }
}, { timestamps: true }); //-> second option adds acreated at timestamp

// create the model to wrap around the schema
const Contact = mongoose.model('Contact', contactSchema); //collection name singular and the structure (schema)

//export the model
module.exports = Contact;