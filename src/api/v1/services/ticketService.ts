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

/**
 * Adds a ticket with status open and the current time
 * @param title - Ticket title
 * @param description - Ticket description
 * @param priority - Ticket priority
 * @returns The created ticket
 */
export const createTicket = (
    title: string,
    description: string,
    priority: Ticket["priority"]
): Ticket => {
    const ids: number[] = tickets.map((ticket: Ticket) => ticket.id);
    const nextId: number = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const newTicket: Ticket = {
        id: nextId,
        title,
        description,
        priority,
        status: "open",
        createdAt: new Date().toISOString(),
    };

    tickets.push(newTicket);
    return newTicket;
};
