import express from "express";
import ResourceController from "@controllers/api/v1/ResourceController";

const router = express.Router();

router.use("/resources", ResourceController);

export default router;