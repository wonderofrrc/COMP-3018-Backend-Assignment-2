import { TicketUrgency, calculateTicketUrgency } from "../src/api/v1/services/ticketUrgency";

describe("calculateTicketUrgency", (): void => {
    it("should stay low when the score is exactly 25", (): void => {
        // Arrange
        const ticketAge: number = 3;

        // Act
        const result: TicketUrgency = calculateTicketUrgency(
            "low",
            "open",
            ticketAge
        );

        // Assert
        expect(result.urgencyScore).toBe(25);
        expect(result.urgencyLevel).toBe(
            "Low urgency. Address when capacity allows."
        );
    });

    it("should return high urgency for a high priority ticket at score 55", (): void => {
        // Arrange
        const ticketAge: number = 5;

        // Act
        const result: TicketUrgency = calculateTicketUrgency(
            "high",
            "open",
            ticketAge
        );

        // Assert
        expect(result.urgencyScore).toBe(55);
        expect(result.urgencyLevel).toBe(
            "High urgency. Prioritize resolution."
        );
    });

    it("should return critical urgency when the score is above 75", (): void => {
        // Arrange
        const ticketAge: number = 6;

        // Act
        const result: TicketUrgency = calculateTicketUrgency(
            "critical",
            "open",
            ticketAge
        );

        // Assert
        expect(result.urgencyScore).toBe(80);
        expect(result.urgencyLevel).toBe(
            "Critical. Immediate attention required."
        );
    });

    it("should return minimal urgency for a resolved ticket", (): void => {
        // Arrange
        const ticketAge: number = 10;

        // Act
        const result: TicketUrgency = calculateTicketUrgency(
            "medium",
            "resolved",
            ticketAge
        );

        // Assert
        expect(result.urgencyScore).toBe(0);
        expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");
    });
});
