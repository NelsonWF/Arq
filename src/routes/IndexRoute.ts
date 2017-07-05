import { NextFunction, Request, Response } from "express";
import { Commons, log } from "../utils";

/**
 * / route
 *
 * @class User
 */
export class IndexRoute {
	public get(req: Request, res: Response): void {
		res.json(Commons.sendResponse("ok"));
	}
	public post(req: Request, res: Response) {
		res.json(Commons.sendResponse("ok"));
	}
	public delete(req: Request, res: Response) {
		res.json(Commons.sendResponse("ok"));
	};
	public put(req: Request, res: Response) {
		res.json(Commons.sendResponse("ok", null, { messages: "error al actualizar los datos" }));
	}
}
