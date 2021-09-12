const mongoose = require("mongoose");

const LinksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = Links = mongoose.model("links", LinksSchema);
