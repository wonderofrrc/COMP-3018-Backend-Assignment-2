/**
 * Support ticket stored by the API
 */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "open" | "in-progress" | "resolved";
    createdAt: string;
}
