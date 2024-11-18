import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { getFollowSuggestions } from "../services/user";

export const getSuggestions = async (req: ExtendedRequest, res: Response) => {
  const suggestions = await getFollowSuggestions(req.userSlug as string);

  res.json({ users: suggestions });
}