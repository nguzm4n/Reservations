import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/user";

const router = Router();

router.get("/", async (req, res) => {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  const result = await AppDataSource.getRepository(User).save(user);
  res.send(result);
});

export default router;
