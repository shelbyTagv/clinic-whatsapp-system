const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const Patient = require("./src/models/patient");
const Appointment = require("./src/models/appointment");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


Patient.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(Patient, { foreignKey: "patientId" });


sequelize
  .sync({ alter: true })
  .then(() => console.log("All models were synchronized successfully."))
  .catch((err) => console.log("Error syncing DB:", err));


// Meta verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});


// bot entry
app.post("/webhook", async (req, res) => {
  const body = req.body;

 
  console.log("Incoming WhatsApp Webhook:", JSON.stringify(body, null, 2));

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
    
      console.log(
        "Message Content:",
        body.entry[0].changes[0].value.messages[0].text.body
      );
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});


app.get("/health", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT NOW()");
    res.json({ status: "API Live", db_time: results[0].now });
  } catch (err) {
    res.status(500).json({ status: "DB Error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
