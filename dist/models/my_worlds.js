"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldStore = void 0;
const database_1 = __importDefault(require("../database"));
class WorldStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM my_worlds';
                const result = yield connect.query(sql);
                connect.release();
                //console.log(result)
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not get worlds ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM my_worlds WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not get world from ${id}: ${error}`);
            }
        });
    }
    create(world) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO my_worlds (name, description) VALUES ($1, $2)';
                const result = yield conn.query(sql, [world.name, world.description]);
                console.log(result);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not create world ${error}`);
            }
        });
    }
    update(id, world) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                // const get_sql = 'SELECT * FROM my_worlds WHERE id = ($1)'
                // const get_result = await conn.query(get_sql, [id]);
                // if(get_result.rows[0] == 'undefined')
                //     throw new Error('Invalid ID');
                const sql = 'UPDATE my_worlds SET name = $1 , description = $2 WHERE id = ($3)';
                const result = yield conn.query(sql, [world.name, world.description, id]);
                if (result.rows[0] == 'undefined')
                    throw new Error('Invalid ID');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update world from ${id}: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM my_worlds WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                if (result.rows[0] == 'undefined')
                    throw new Error('Invalid ID');
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Can not update world from ${id}: ${error}`);
            }
        });
    }
}
exports.WorldStore = WorldStore;
