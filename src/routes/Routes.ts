import { NextFunction, Request, Response, Router, ErrorRequestHandler } from "express";
import { IndexRoute, isAuthenticated} from "./";
import * as moment from "moment";
import { log, Commons } from "../utils/";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class Routes {

    constructor() {

    }
    public static createRoutes(router: Router) {
        //Middlewar para realizar logger a todas las peticiones
        router.use(function (req: Request, res: Response, next: NextFunction) {
            let now = moment(new Date());
            let date = now.format("DD-MM-YYYY HH:mm:ss");
            log.info("%s %s %s", req.method, req.url, date);
            next();
        });
        
        //Declarar todas las rutas
        let indexRoute: IndexRoute = new IndexRoute();

        //EndPoints
        router.route("/").get(isAuthenticated,indexRoute.get).post(indexRoute.post).put(indexRoute.put).delete(indexRoute.delete);
    }
}