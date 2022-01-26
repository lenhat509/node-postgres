import db from '../database';

export type World = {
    id: Number,
    name: string,
    description: string
}

export class WorldStore {
    async index(): Promise<World[]> {
        try {
            const connect = await db.connect();
            const sql = 'SELECT * FROM my_worlds';
            const result = await connect.query(sql);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get worlds ${error}`)
        }
    }
    async show(id: Number): Promise<World>
    {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM my_worlds WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rows[0] == undefined)
            {
                throw new Error('Invalid ID');
            }
                
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get world from ${id}: ${error}`)
        }
    }

    async create(world: World): Promise<World> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO my_worlds (name, description) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [world.name, world.description]);
            conn.release();
            return result.rows[0]; 
        } catch (error) {
            throw new Error(`Can not create world ${error}`)
        }
    }

    async update(id: Number, world: World): Promise<World>
    {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE my_worlds SET name = $1 , description = $2 WHERE id = ($3) RETURNING *';
            const result = await conn.query(sql, [world.name, world.description, id]);
            conn.release();
            if(result.rows[0] == undefined)
                throw new Error('Invalid ID');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update world from ${id}: ${error}`)
        }
    }
    async delete(id: Number): Promise<World>
    {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM my_worlds WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if(result.rows[0] == undefined)
                throw new Error('Invalid ID');
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update world from ${id}: ${error}`)
        }
    }
}