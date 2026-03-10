const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/payment");
const labelRoutes = require("./routes/label");
const adminRoutes = require("./routes/admin");
const shipmentRoutes = require("./routes/shipment");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);
app.use("/api/label", labelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/shipment", shipmentRoutes);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});

