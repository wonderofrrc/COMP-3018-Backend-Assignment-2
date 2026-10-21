import express, { Express, Request, Response } from "express";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));

/**
 * Root route for basic server verification
 * @param _req - Express request object
 * @param res - Express response object
 * @returns void
 */
app.get("/", (_req: Request, res: Response): void => {
    res.send("Hello, World!");
});

export default app;
