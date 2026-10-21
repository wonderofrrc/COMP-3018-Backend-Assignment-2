import express, { Router } from "express";
import {
    getAllTickets,
    getTicketById,
    createTicket,
} from "../controllers/ticketController";

const ticketRouter: Router = express.Router();

ticketRouter.get("/tickets", getAllTickets);
ticketRouter.get("/tickets/:id", getTicketById);
ticketRouter.post("/tickets", createTicket);

export default ticketRouter;
