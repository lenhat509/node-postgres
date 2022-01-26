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
            //console.log(result)
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
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get world from ${id}: ${error}`)
        }
    }

    async create(world: World): Promise<World> {
        try {
            const conn = await db.connect();
            const sql = 'INSERT INTO my_worlds (name, description) VALUES ($1, $2)';
            const result = await conn.query(sql, [world.name, world.description]);
            console.log(result)
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
            // const get_sql = 'SELECT * FROM my_worlds WHERE id = ($1)'
            // const get_result = await conn.query(get_sql, [id]);
            // if(get_result.rows[0] == 'undefined')
            //     throw new Error('Invalid ID');
            const sql = 'UPDATE my_worlds SET name = $1 , description = $2 WHERE id = ($3)';
            const result = await conn.query(sql, [world.name, world.description, id]);
            if(result.rows[0] == 'undefined')
                throw new Error('Invalid ID');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update world from ${id}: ${error}`)
        }
    }
    async delete(id: Number): Promise<World>
    {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM my_worlds WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            if(result.rows[0] == 'undefined')
                throw new Error('Invalid ID');
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update world from ${id}: ${error}`)
        }
    }
}