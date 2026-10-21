import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Ticket } from "../models/ticketModel";
import * as ticketService from "../services/ticketService";

/**
 * Returns all tickets
 * @param _req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const getAllTickets = (_req: Request, res: Response): void => {
    const allTickets: Ticket[] = ticketService.getAllTickets();

    res.status(HTTP_STATUS.OK).json({
        message: "Tickets retrieved",
        count: allTickets.length,
        data: allTickets,
    });
};

/**
 * Returns one ticket by id
 * @param req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const getTicketById = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const ticket: Ticket | undefined = ticketService.getTicketById(id);

    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket retrieved",
        data: ticket,
    });
};

const validPriorities: Ticket["priority"][] = [
    "critical",
    "high",
    "medium",
    "low",
];

/**
 * Creates a ticket from the request body
 * @param req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const createTicket = (req: Request, res: Response): void => {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const priority: Ticket["priority"] = req.body.priority;

    if (!title) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title",
        });
        return;
    }

    if (!description) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: description",
        });
        return;
    }

    if (!validPriorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return;
    }

    const newTicket: Ticket = ticketService.createTicket(
        title,
        description,
        priority
    );

    res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created",
        data: newTicket,
    });
};
