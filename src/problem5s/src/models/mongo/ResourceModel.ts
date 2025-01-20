import { Schema, model, Document } from "mongoose";
import toJSON from "@util/toJSON";

interface IResource extends Document {
    id?: string;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ResourceSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});

ResourceSchema.plugin(toJSON);

const ResourceModel = model<IResource>("resources", ResourceSchema, "resources");

export {
    IResource,
    ResourceModel,
};