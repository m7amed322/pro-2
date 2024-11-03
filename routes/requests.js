const express = require("express");
const requestController = require("../controllers/requests");
const router = express.Router();
router.post("/", requestController.createRequest);
module.exports = router;
