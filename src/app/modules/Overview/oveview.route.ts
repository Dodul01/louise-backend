import express from "express";
import auth from "../../middlewares/auth";
import { OverviewController } from "./overview.controller";

const router = express.Router();

router.get('/get-overview', auth('admin'), OverviewController.getOverview);

export const OverviewRouter = router;