import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as helmet from "helmet";
import * as session from "express-session";
import * as passport from "passport";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { Routes } from "./routes";
import { log } from "./utils";
/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        dotenv.config();
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        let router: express.Router;
        router = express.Router();
        Routes.createRoutes(router);
        //use router middleware
        this.app.use('/'+process.env.API_VERSION,router);
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        //this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        //this.app.set("views", path.join(__dirname, "views"));
        //this.app.set("view engine", "pug");

        //use morgan middlware
        this.app.use(morgan("dev"));

        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(session({
            secret: process.env.API_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: { secure: true }
        }));
        //use cookie parker middleware middlware
        this.app.use(cookieParser(process.env.API_KEY));

        //use override middlware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        if (process.env.NODE_ENV.trim() === 'development') {
            //error handling
            this.app.use(errorHandler());
        }
        //helmet
        this.app.use(helmet());

        //configure passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}