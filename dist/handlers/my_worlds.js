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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWorldsRoutes = void 0;
const my_worlds_1 = require("../models/my_worlds");
const store = new my_worlds_1.WorldStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield store.show(id);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const result = yield store.create({ id: 0, name, description });
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const description = req.body.description;
        const result = yield store.update(id, { id, name, description });
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield store.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const MyWorldsRoutes = (app) => {
    app.get('/all', index);
    app.get('/world/:id', show);
    app.post('/create', create);
    app.put('/update/:id', update);
    app.delete('/delete/:id', destroy);
};
exports.MyWorldsRoutes = MyWorldsRoutes;
