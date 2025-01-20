import {Request, Response, NextFunction} from "express";
import config from "../config";
import {BaseMetaResponseInterface, BaseResponseInterface} from "@controllers/response/BaseReponse";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const metaResponse: BaseMetaResponseInterface = {
        status: statusCode,
        internalMessage: config.env === "development" ? message.stack || err.stack : (message.message || message),
        externalMessage: message.message || message,
        success: false
    };

    const response:BaseResponseInterface<any> = {
        meta: metaResponse
    };

    res.status(statusCode).send(response);
};

export {
    errorHandler
};