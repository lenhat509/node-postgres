import db from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const {
    BCRYPT_PASSWORD: pepper,
    SALT_ROUNDS: saltRounds
} = process.env

export interface User {
    id: Number,
    username: string,
    password: string,
}

export class UserStore {
    async index (): Promise<User[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get users ${error}`);
        }
    }

    async show (id: Number): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rowCount == 0)
            {
                throw new Error(`User ${id} does not exist`)
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get user ${error}`);
        }
    }
    async create (user: {username: string, password: string}): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
            const encryptedPassword = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds as string)
            );
            const result = await conn.query(sql, [user.username, encryptedPassword]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create user ${error}`);
        }
    }

    async update (user: {id: Number, username: string}) : Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE users SET username = $2 WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [user.id, user.username]);
            conn.release();
            if(result.rowCount == 0)
            {
                throw new Error('Can not update user');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async delete (id: Number) : Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rowCount == 0)
            {
                throw new Error('User does not exist');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete user ${error}`);
        }
    }

    async authenticate (user: {username: string, password: string}): Promise<User> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE username = $1';
            const result = await conn.query(sql, [user.username]);
            if(result.rowCount == 0)
                throw new Error('Username does not exist');
            const authenticated = bcrypt.compareSync(user.password + pepper, result.rows[0].password);
            if(!authenticated)
                throw new Error('Password does not match');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not log in ${error}`);
        }
    }
}