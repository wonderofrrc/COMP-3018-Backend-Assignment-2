import { Ticket } from "../api/v1/models/ticketModel";

const MS_PER_DAY: number = 24 * 60 * 60 * 1000;

// Offsets are from today so the ages stay the same
const daysAgo = (days: number): string => {
    return new Date(Date.now() - days * MS_PER_DAY).toISOString();
};

export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: daysAgo(3),
    },
    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: daysAgo(2),
    },
    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: daysAgo(6),
    },
    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: daysAgo(5),
    },
    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: daysAgo(9),
    },
    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: daysAgo(6),
    },
    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: daysAgo(10),
    },
];
