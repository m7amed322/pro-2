const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://mohamedabdalslam678:6vJEPr8tVUCqSfBr@graduationproject.hspls.mongodb.net/?retryWrites=true&w=majority&appName=graduationProject"
    )
    .then(() => winston.info("mongodb connected .."));
};
