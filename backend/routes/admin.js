const express = require("express");
const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({
    shipments: 10,
    revenue: 500
  });
});

module.exports = router;