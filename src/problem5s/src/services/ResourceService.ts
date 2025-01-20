import { IResource, ResourceModel } from "@models/mongo/ResourceModel";
import { IResourceDTO } from "@models/dto/ResourceDTO";
import ValidationError from "@exceptions/ValidationError";
import { IPaginate } from "@controllers/response/BaseReponse";
import { ResourceRequestPayload } from "@controllers/request/ResourceRequestPayload";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const getResourcePaging = async (querymen: any, page: number, pageSize: number): Promise<IPaginate<IResourceDTO>> => {
    const resources: Array<IResource> = await ResourceModel.find({
        ...querymen.query,
    }, querymen.select, querymen.cursor);

    const count: number = await ResourceModel.countDocuments({ ...querymen.query });

    const results: IResourceDTO[] = resources.map((item: IResource): IResourceDTO => parseResourceDTO(item));

    return {
        page,
        pageSize,
        total: count,
        datas: results
    };
};

const createResource = async (data: ResourceRequestPayload): Promise<IResourceDTO> => {
    const { name, description } = data;

    if (!name) throw new ValidationError("Name is required!", 400);
    if (!description) throw new ValidationError("Description is required!", 400);

    const resource: IResource = new ResourceModel({
        name,
        description
    });

    await resource.save();

    return parseResourceDTO(resource);
};

const getResourceByID = async (id: string): Promise<IResourceDTO> => {
    if (!ObjectId.isValid(id)) {
        throw new ValidationError("Id resource invalid!", 400);
    }
    const resource: IResource = await ResourceModel.findById(ObjectId(id));

    if (!resource) throw new ValidationError("Resource not found!", 404);

    return parseResourceDTO(resource);
};

const updateResourceByID = async (id: string, data: ResourceRequestPayload): Promise<IResourceDTO> => {
    if (!ObjectId.isValid(id)) {
        throw new ValidationError("Id resource invalid!", 400);
    }
    const { name, description } = data;
    const dataUpdate: any  = {};

    if (name) dataUpdate.name = name;
    if (description) dataUpdate.description = description;

    const resource = await ResourceModel.findByIdAndUpdate(ObjectId(id), dataUpdate, { new: true });

    if (!resource) throw new ValidationError("Resource not found!", 404);

    return parseResourceDTO(resource);
};

const deleteResourceByID = async (id: string): Promise<IResourceDTO> => {
    if (!ObjectId.isValid(id)) {
        throw new ValidationError("Id resource invalid!");
    }
    const resource: IResource = await ResourceModel.findByIdAndDelete(ObjectId(id));

    if (!resource) throw new ValidationError("Resource not found!", 404);

    return parseResourceDTO(resource);
};

const parseResourceDTO = (resource: IResource): IResourceDTO => {
    return {
        id: resource.id,
        name: resource.name,
        description: resource.description
    }
}

export {
    getResourcePaging,
    createResource,
    getResourceByID,
    updateResourceByID,
    deleteResourceByID
};