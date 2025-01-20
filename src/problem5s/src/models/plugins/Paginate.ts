import {IPaginate} from "@controllers/response/BaseReponse";
import {Model} from "mongoose";

interface IPaginateQuery {
    page: number;
    pageSize: number;
}

async function paginate<T>(model: Model<any>,filter: any, paginateQuery: IPaginateQuery, sort?: string) : Promise<IPaginate<T>> {
    const { page, pageSize } = paginateQuery;
    const cursor = (page - 1) * pageSize;

    const results: T[] = await model.find(filter).skip(cursor).limit(pageSize).sort(sort);
    const countTotal = await model.count(filter);

    return {
        page: page,
        pageSize: pageSize,
        datas: results,
        total: countTotal
    };
}

export {
    IPaginateQuery,
    paginate
};