import request, { Response } from "supertest";
import app from "../src/app";

describe("Ticket routes", (): void => {
    describe("GET /api/v1/tickets", (): void => {
        it("should return all tickets", async (): Promise<void> => {
            // Arrange
            // (no setup needed, sample tickets are already loaded)

            // Act
            const response: Response = await request(app).get("/api/v1/tickets");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Tickets retrieved");
            expect(response.body.count).toBe(7);
        });
    });

    describe("GET /api/v1/tickets/:id", (): void => {
        it("should return 404 when the ticket does not exist", async (): Promise<void> => {
            // Arrange
            // (no setup needed)

            // Act
            const response: Response = await request(app).get(
                "/api/v1/tickets/999"
            );

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Ticket not found");
        });
    });

    describe("POST /api/v1/tickets", (): void => {
        it("should create a ticket", async (): Promise<void> => {
            // Arrange
            const newTicket: {
                title: string;
                description: string;
                priority: string;
            } = {
                title: "Printer jam",
                description: "Third floor printer is jammed",
                priority: "low",
            };

            // Act
            const response: Response = await request(app)
                .post("/api/v1/tickets")
                .send(newTicket);

            // Assert
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Ticket created");
            expect(response.body.data.status).toBe("open");
            expect(response.body.data.title).toBe("Printer jam");
        });

        it("should return 400 when title is missing", async (): Promise<void> => {
            // Arrange
            const newTicket: {
                description: string;
                priority: string;
            } = {
                description: "No title on purpose",
                priority: "low",
            };

            // Act
            const response: Response = await request(app)
                .post("/api/v1/tickets")
                .send(newTicket);

            // Assert
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Missing required field: title");
        });
    });

    describe("PUT /api/v1/tickets/:id", (): void => {
        it("should return 400 when status is invalid", async (): Promise<void> => {
            // Arrange
            const updates: {
                status: string;
            } = {
                status: "closed",
            };

            // Act
            const response: Response = await request(app)
                .put("/api/v1/tickets/1")
                .send(updates);

            // Assert
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(
                "Invalid status. Must be one of: open, in-progress, resolved"
            );
        });
    });

    describe("DELETE /api/v1/tickets/:id", (): void => {
        it("should delete a ticket", async (): Promise<void> => {
            // Arrange
            const created: Response = await request(app)
                .post("/api/v1/tickets")
                .send({
                    title: "Ticket to delete",
                    description: "Created so delete has an id",
                    priority: "low",
                });
            const id: number = created.body.data.id;

            // Act
            const response: Response = await request(app).delete(
                `/api/v1/tickets/${id}`
            );

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Ticket deleted");
        });
    });

    describe("GET /api/v1/tickets/:id/urgency", (): void => {
        it("should return critical urgency for ticket 6", async (): Promise<void> => {
            // Arrange
            // (ticket 6 is critical and 6 days old)

            // Act
            const response: Response = await request(app).get(
                "/api/v1/tickets/6/urgency"
            );

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Ticket urgency calculated");
            expect(response.body.data.urgencyScore).toBe(80);
            expect(response.body.data.urgencyLevel).toBe(
                "Critical. Immediate attention required."
            );
        });

        it("should return 404 when the ticket does not exist", async (): Promise<void> => {
            // Arrange
            // (no setup needed)

            // Act
            const response: Response = await request(app).get(
                "/api/v1/tickets/999/urgency"
            );

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Ticket not found");
        });
    });
});
