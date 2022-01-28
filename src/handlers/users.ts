import  {User, UserStore} from '../models/users';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyUserAuth, verifyUserAuthorized} from '../middleware/authenticate'

dotenv.config();
const { SECRET_TOKEN: secret_token } = process.env
const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const results = await store.index();
        res.json(results);
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const result = await store.create({username, password});
        const token = jwt.sign(result, secret_token as string);
        res.json({token, user: result});
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await store.show(id);
        res.json(result);
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}


const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const username = req.body.username;
        const result = await store.update({id, username});
        res.json(result);
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}


const destroy = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await store.delete(id);
        res.json(result);
    } catch (error: any) {
        res.status(400);
        res.json(error.message);
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await store.authenticate({username, password});
        const token = jwt.sign( user, secret_token as string);
        res.json({token, user})
    } catch (error: any) {
        res.status(401);
        res.json(error.message)
    }
}

export const MyUsersRoutes = (app: express.Application) => {
    app.get('/users', verifyUserAuth, index);
    app.get('/user/:id', verifyUserAuth, show);
    app.post('/user/signin', authenticate),
    app.post('/user/create', create);
    app.put('/user/update/:id', verifyUserAuthorized, update);
    //app.delete('/user/delete/:id', destroy);
}

