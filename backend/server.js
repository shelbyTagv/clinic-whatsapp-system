const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json({ status: "API Live", db_time: result.rows[0].now });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
