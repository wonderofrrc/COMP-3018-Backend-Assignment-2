import { Ticket } from "../models/ticketModel";
import { tickets } from "../../../data/tickets";

/**
 * Returns every ticket
 * @returns Array of tickets
 */
export const getAllTickets = (): Ticket[] => {
    return tickets;
};

/**
 * Finds a ticket by id
 * @param id - Ticket id
 * @returns Matching ticket or undefined
 */
export const getTicketById = (id: number): Ticket | undefined => {
    return tickets.find((ticket: Ticket) => ticket.id === id);
};
