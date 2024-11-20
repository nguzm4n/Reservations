import "reflect-metadata";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",  
  host: process.env.DB_HOST || "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "reservas",
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"], 
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  extra: {
    timezone: 'America/Santiago', 
  }
});
