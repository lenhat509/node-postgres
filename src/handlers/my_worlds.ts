import { World, WorldStore } from '../models/my_worlds';
import express, {Response, Request} from 'express';

const store = new WorldStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await store.index();
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await store.show(id);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const result = await store.create({id: 0, name, description});
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const description = req.body.description;
        const result = await store.update(id, {id, name, description});
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await store.delete(id);
        res.json(result)
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export const MyWorldsRoutes = (app: express.Application) => {
    app.get('/all', index);
    app.get('/world/:id', show);
    app.post('/create', create);
    app.put('/update/:id', update);
    app.delete('/delete/:id', destroy);
}