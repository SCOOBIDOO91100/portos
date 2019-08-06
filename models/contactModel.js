const mongoose = require ("mongoose");

const contactSchema = mongoose.Schema({
    titre: String,
});

const Contact = mongoose.model("contact", contactSchema );

module.exports = Contact