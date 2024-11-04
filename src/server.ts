import express from "express";
import { AppDataSource } from "./config/data-source";
import api from "./config/api.config";
import "reflect-metadata";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', api());


// Inicializa la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

  export default app;