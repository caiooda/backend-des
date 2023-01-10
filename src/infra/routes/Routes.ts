import { Router } from "express";
import { GetOpportunitiesController } from "../controllers/opportunities/GetOpportunitiesController";

const Routes = Router();
const getOpportunitiesController = new GetOpportunitiesController();

Routes.get("/opportunities", getOpportunitiesController.handle);

export default Routes;
