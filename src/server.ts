import express, {Response, Request} from 'express';
import { MyWorldsRoutes } from './handlers/my_worlds';
import dotenv from 'dotenv';
import body_parser from 'body-parser';


dotenv.config();
const app = express();
const {
    PORT
} = process.env

app.use(body_parser.json())

MyWorldsRoutes(app);

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})