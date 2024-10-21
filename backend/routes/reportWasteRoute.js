import express from "express";
import {
  getAllReportsControllerbyAdmin,
  getReportsController,
  reportWasteController,
} from "../controllers/reportWasteController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const reportWasteRouter = express.Router();

reportWasteRouter.post("/create", requireSignIn, reportWasteController);
reportWasteRouter.get("/getReports/:userId", getReportsController);

//get all waste reports
reportWasteRouter.get(
  "/getReports",
  requireSignIn,
  isAdmin,
  getAllReportsControllerbyAdmin
);

export default reportWasteRouter;
