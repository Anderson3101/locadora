const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const motoristaRoutes = require("./routes/motoristaRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/motoristas", motoristaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
