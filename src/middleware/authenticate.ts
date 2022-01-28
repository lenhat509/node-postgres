import express, {Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/users'
dotenv.config();

export const verifyUserAuthorized = (req: Request, res: Response, next: any) => {
    try {
        const authorzationHeader = req.headers.authorization as string;
        const token = authorzationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN as string);
        const user: User = JSON.parse(JSON.stringify(decodedToken));
        const id = parseInt(req.params.id as string);
        if(user.id !== id)
        {
            return res.sendStatus(403);
        }
        next()
    } catch (error: any) {
        res.status(400);
        res.json(error.message)
    }
}

export const verifyUserAuth = (req: Request, res: Response, next: any) => {
    try {
        const authorzationHeader = req.headers.authorization as string;
        const token = authorzationHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN as string);
        next()
    } catch (error: any) {
        res.status(401);
        res.json(error.message)
    }
}