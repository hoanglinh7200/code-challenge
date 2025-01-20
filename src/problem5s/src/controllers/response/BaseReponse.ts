export interface BaseResponseInterface<T> {
    meta: BaseMetaResponseInterface;
    data?: T
}

export interface BaseMetaResponseInterface {
    success: boolean;
    internalMessage: string;
    externalMessage: string;
    status: number;
}

export interface IPaginate<T> {
    page: number;
    pageSize: number;
    total: number;
    datas: T[]
}