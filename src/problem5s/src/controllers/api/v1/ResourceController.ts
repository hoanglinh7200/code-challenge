import { NextFunction, Request, Response, Router } from "express";
import { BaseResponseInterface, IPaginate } from "@controllers/response/BaseReponse";
import ValidationError from "@exceptions/ValidationError";
import { createResource, deleteResourceByID, getResourceByID, getResourcePaging, updateResourceByID } from "@services/ResourceService";
import { IResourceDTO } from "@models/dto/ResourceDTO";
import { parseInt } from "lodash";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import querymen from "querymen";
import { ResourceRequestPayload } from "@controllers/request/ResourceRequestPayload";

const schema = new querymen.Schema({
    s: {
        type: RegExp,
        paths: ["name", "description"]
    }
}, {
    page: false
});

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the resource
 *         name:
 *           type: string
 *           description: The name of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *     ResourcePayLoad:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *     ResourceUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 */


/**
 * @swagger
 * /api/v1/resources:
 *   get:
 *     summary: Retrieve a list of resources
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: s
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter resources by name
 *     responses:
 *       200:
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */
router.get("/", querymen.middleware(schema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const querymen = req.querymen;

        const page = parseInt(req.query.page ? req.query.page.toString() : "1") || 1;
        const pageSize = parseInt(req.query.pageSize ? req.query.pageSize.toString() : "10") || 10;

        const datas: IPaginate<IResourceDTO> = await getResourcePaging(querymen, page, pageSize);

        const responseData: BaseResponseInterface<IPaginate<IResourceDTO>> = {
            meta: {
                status: 200,
                success: true,
                externalMessage: "Success",
                internalMessage: "Success",
            },
            data: datas
        };
        res.send(responseData);
    } catch (e) {
        if (e instanceof ValidationError) {
            const responseData: BaseResponseInterface<any> = {
                meta: {
                    status: e.statusCode,
                    success: false,
                    externalMessage: e.message,
                    internalMessage: e.message,
                },
                data: e.data
            };
            res.send(responseData);
        } else {
            next(e);
        }
    }
});

/**
 * @swagger
 * /api/v1/resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourcePayLoad'
 *     responses:
 *       201:
 *         description: The resource was successfully created
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Some server error
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ResourceRequestPayload = req.body;

        const resource: IResourceDTO = await createResource(payload);

        const responseData: BaseResponseInterface<IResourceDTO> = {
            meta: {
                status: 201,
                success: true,
                externalMessage: "Success",
                internalMessage: "Success",
            },
            data: resource
        };
        res.send(responseData);
    } catch (e) {
        if (e instanceof ValidationError) {
            const responseData: BaseResponseInterface<any> = {
                meta: {
                    status: e.statusCode,
                    success: false,
                    externalMessage: e.message,
                    internalMessage: e.message,
                },
                data: e.data
            };
            res.send(responseData);
        } else {
            next(e);
        }
    }
});

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: The resource details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Resource not found
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;

        const resource: IResourceDTO = await getResourceByID(id);

        const responseData: BaseResponseInterface<IResourceDTO> = {
            meta: {
                status: 200,
                success: true,
                externalMessage: "Success",
                internalMessage: "Success",
            },
            data: resource
        };
        res.send(responseData);
    } catch (e) {
        if (e instanceof ValidationError) {
            const responseData: BaseResponseInterface<any> = {
                meta: {
                    status: e.statusCode,
                    success: false,
                    externalMessage: e.message,
                    internalMessage: e.message,
                },
                data: e.data
            };
            res.send(responseData);
        } else {
            next(e);
        }
    }
});

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   put:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceUpdate'
 *     responses:
 *       200:
 *         description: The updated resource
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const payload: ResourceRequestPayload = req.body;

        const resource: IResourceDTO = await updateResourceByID(id, payload);

        const responseData: BaseResponseInterface<IResourceDTO> = {
            meta: {
                status: 200,
                success: true,
                externalMessage: "Success",
                internalMessage: "Success",
            },
            data: resource
        };
        res.send(responseData);
    } catch (e) {
        if (e instanceof ValidationError) {
            const responseData: BaseResponseInterface<any> = {
                meta: {
                    status: e.statusCode,
                    success: false,
                    externalMessage: e.message,
                    internalMessage: e.message,
                },
                data: e.data
            };
            res.send(responseData);
        } else {
            next(e);
        }
    }
});

/**
 * @swagger
 * /api/v1/resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The resource ID
 *     responses:
 *       204:
 *         description: The resource was successfully deleted
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;

        await deleteResourceByID(id);

        const responseData: BaseResponseInterface<null> = {
            meta: {
                status: 204,
                success: true,
                externalMessage: "Success",
                internalMessage: "Success",
            }
        };
        res.send(responseData);
    } catch (e) {
        if (e instanceof ValidationError) {
            const responseData: BaseResponseInterface<any> = {
                meta: {
                    status: e.statusCode,
                    success: false,
                    externalMessage: e.message,
                    internalMessage: e.message,
                },
                data: e.data
            };
            res.send(responseData);
        } else {
            next(e);
        }
    }
});

export default router;