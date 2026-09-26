import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supplyRoutes from "./routes/supplyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Servidor corriendo",
  });
});

app.use("/api/", supplyRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo`);
});

