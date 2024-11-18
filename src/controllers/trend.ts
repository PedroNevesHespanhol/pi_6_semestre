import { Response } from "express";
import { findTrends } from "../services/trend";
import { ExtendedRequest } from "../types/extended-request";

export const getTrends = async (req: ExtendedRequest, res: Response) => {
    const trends = await findTrends();

    res.json({ trends });
}