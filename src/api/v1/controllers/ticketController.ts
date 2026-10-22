import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Ticket } from "../models/ticketModel";
import * as ticketService from "../services/ticketService";
import {
    calculateTicketUrgency,
    getTicketAgeInDays,
    TicketUrgency,
} from "../services/ticketUrgency";

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

const validStatuses: Ticket["status"][] = ["open", "in-progress", "resolved"];

/**
 * Updates a ticket from the request body
 * @param req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const updateTicket = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const priority: Ticket["priority"] | undefined = req.body.priority;
    const status: Ticket["status"] | undefined = req.body.status;

    if (priority !== undefined && !validPriorities.includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message:
                "Invalid priority. Must be one of: critical, high, medium, low",
        });
        return;
    }

    if (status !== undefined && !validStatuses.includes(status)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message:
                "Invalid status. Must be one of: open, in-progress, resolved",
        });
        return;
    }

    const updates: Partial<
        Pick<Ticket, "title" | "description" | "priority" | "status">
    > = {};

    if (req.body.title !== undefined) {
        updates.title = req.body.title;
    }
    if (req.body.description !== undefined) {
        updates.description = req.body.description;
    }
    if (priority !== undefined) {
        updates.priority = priority;
    }
    if (status !== undefined) {
        updates.status = status;
    }

    const updatedTicket: Ticket | undefined = ticketService.updateTicket(
        id,
        updates
    );

    if (!updatedTicket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket updated",
        data: updatedTicket,
    });
};

/**
 * Deletes a ticket by id
 * @param req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const deleteTicket = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const deleted: boolean = ticketService.deleteTicket(id);

    if (!deleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket deleted",
    });
};

/**
 * Returns one ticket with its urgency score and message
 * @param req - Express request object
 * @param res - Express response object
 * @returns void
 */
export const getTicketUrgency = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const ticket: Ticket | undefined = ticketService.getTicketById(id);

    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found",
        });
        return;
    }

    const ticketAge: number = getTicketAgeInDays(ticket.createdAt);
    const urgency: TicketUrgency = calculateTicketUrgency(
        ticket.priority,
        ticket.status,
        ticketAge
    );

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket urgency calculated",
        data: {
            id: ticket.id,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            ticketAge: urgency.ticketAge,
            urgencyScore: urgency.urgencyScore,
            urgencyLevel: urgency.urgencyLevel,
        },
    });
};
