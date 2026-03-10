const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    status: "payment success"
  });
});

module.exports = router;