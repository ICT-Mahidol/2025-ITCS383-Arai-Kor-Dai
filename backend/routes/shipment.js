const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let shipments = [];

router.post("/", (req, res) => {
  const { sender, receiver, weight } = req.body;

  const shipment = {
    id: uuidv4(),
    sender,
    receiver,
    weight,
    status: "created"
  };

  shipments.push(shipment);

  res.json(shipment);
});

router.get("/", (req, res) => {
  res.json(shipments);
});

module.exports = router;