import express, {Request, Response, NextFunction} from "express";
import compression from "compression";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "./config";
import apiRouter from "./controllers/api";
import {healthCheck} from "./util";
import toJSON from "./util/toJSON";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as process from "process";


// Create Express server
const app = express();

// Connect to MongoDB
mongoose.set("debug", process.env.NODE_ENV === "development");
mongoose.connect(config.mongoose.url, config.mongoose.option).then(
    () => {
        console.log("MongoDB connected!");
    },
).catch((err: Error) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});

// MongoDB plugins
mongoose.plugin(toJSON);
const db = mongoose.connection;

// registered model mongoDb
import "./models/mongo/ResourceModel";

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cookieParser());

const origins: string[] = [
    "http://localhost:3000",
    "http://localhost:3000/",
    "https://localhost:3000",
    "https://localhost:3000/",
];

const corsOption = {
    origin: origins,
    credentials: true
};

app.use(cors(corsOption));
app.options("*", cors(corsOption));

// health check
app.get("/", (req: Request, res: Response) => {
    if (healthCheck()) {
        res.status(httpStatus.OK).json({status: "UP", env: process.env.NODE_ENV});
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status: "DOWN", env: process.env.NODE_ENV});
    }
});

//swagger docs api
import { swaggerDocs } from "./swagger/swaggerJsDoc";
import swaggerUi from 'swagger-ui-express';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Primary api routes.
 */
app.use("/api", apiRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).send({
        status: 404,
        internalMessage: "Route not found",
        externalMessage: "Route not found",
        success: false
    });
});

db.on("error", console.error.bind(console, "Connection Error:"));

export default app;
