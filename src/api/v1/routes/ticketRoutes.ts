import express, { Router } from "express";
import { getAllTickets, getTicketById } from "../controllers/ticketController";

const ticketRouter: Router = express.Router();

ticketRouter.get("/tickets", getAllTickets);
ticketRouter.get("/tickets/:id", getTicketById);

export default ticketRouter;
