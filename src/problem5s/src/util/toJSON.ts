const deleteAtPath = (obj: any, path: string[], index: number) => {
    if (index === path.length - 1) {
        delete obj[path[index]];
        return;
    }
    deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema: any) => {
    let transform: any;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }

    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc: any, ret: any, options: any) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    deleteAtPath(ret, path.split("."), 0);
                }
            });

            if (ret._id) {
                ret.id = ret._id.toString();
            }
            delete ret._id;
            delete ret.__v;
            delete ret.isDeleted;
            if (transform) {
                return transform(doc, ret, options);
            }
        },
    });
};

export default toJSON;