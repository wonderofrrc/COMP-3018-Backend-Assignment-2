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
