import mongoose from "mongoose";

export const healthCheck = ():boolean => {
    return mongoose.connection.readyState == 1;
};
