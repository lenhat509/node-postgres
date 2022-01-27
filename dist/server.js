"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import dotenv from 'dotenv';
//dotenv.config();
const app = (0, express_1.default)();
const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
