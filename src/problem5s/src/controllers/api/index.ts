import express, { Router } from "express";
import myRouter from "./v1";
const router: Router = express.Router();

router.use("/v1", myRouter);

export default router;