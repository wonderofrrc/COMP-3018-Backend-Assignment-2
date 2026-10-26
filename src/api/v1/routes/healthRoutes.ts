import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const healthRouter: Router = Router();

/**
 * Health check response shape
 */
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

/**
 * Returns server health status information
 * @param _req - Express request object
 * @param res - Express response object
 * @returns void
 */
healthRouter.get("/health", (_req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.status(HTTP_STATUS.OK).json(healthData);
});

export default healthRouter;
