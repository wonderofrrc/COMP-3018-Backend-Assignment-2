import { Ticket } from "../models/ticketModel";

/**
 * Urgency score and message for one ticket
 */
export interface TicketUrgency {
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
}

interface UrgencyThreshold {
    matches: (urgencyScore: number) => boolean;
    level: string;
}

const MS_PER_DAY: number = 24 * 60 * 60 * 1000;

const baseScores: Record<Ticket["priority"], number> = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
};

const urgencyThresholds: UrgencyThreshold[] = [
    {
        matches: (urgencyScore: number): boolean => urgencyScore > 75,
        level: "Critical. Immediate attention required.",
    },
    {
        matches: (urgencyScore: number): boolean => urgencyScore > 50,
        level: "High urgency. Prioritize resolution.",
    },
    {
        matches: (urgencyScore: number): boolean => urgencyScore > 25,
        level: "Moderate. Schedule for attention.",
    },
    {
        matches: (_urgencyScore: number): boolean => true,
        level: "Low urgency. Address when capacity allows.",
    },
];

/**
 * Whole days since the ticket was created
 * @param createdAt - ISO timestamp
 * @returns Age in days
 */
export const getTicketAgeInDays = (createdAt: string): number => {
    const ageMs: number = Date.now() - new Date(createdAt).getTime();
    return Math.floor(ageMs / MS_PER_DAY);
};

/**
 * Calculates urgency from priority, status, and age
 * @param priority - Ticket priority
 * @param status - Ticket status
 * @param ticketAge - Age in whole days
 * @returns Score and level message
 */
export const calculateTicketUrgency = (
    priority: Ticket["priority"],
    status: Ticket["status"],
    ticketAge: number
): TicketUrgency => {
    if (status === "resolved") {
        return {
            ticketAge,
            urgencyScore: 0,
            urgencyLevel: "Minimal. Ticket resolved.",
        };
    }

    const urgencyScore: number = baseScores[priority] + ticketAge * 5;
    const matchedThreshold: UrgencyThreshold | undefined =
        urgencyThresholds.find((threshold: UrgencyThreshold) =>
            threshold.matches(urgencyScore)
        );

    return {
        ticketAge,
        urgencyScore,
        urgencyLevel:
            matchedThreshold?.level ??
            "Low urgency. Address when capacity allows.",
    };
};
