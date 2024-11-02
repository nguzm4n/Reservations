import express from "express";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/user.routes";
import "reflect-metadata";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

// Inicializa la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));
