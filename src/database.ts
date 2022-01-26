import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE_TEST,
    ENV
} = process.env;

let db: Pool;
console.log(ENV);
if(ENV == 'test')
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DATABASE_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}
else
{
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DATABASE,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}


export default db;