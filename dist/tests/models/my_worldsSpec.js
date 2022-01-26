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
const my_worlds_1 = require("../../models/my_worlds");
const store = new my_worlds_1.WorldStore();
const dummyWorld = [
    {
        id: 1,
        name: 'Level 1',
        description: 'Starting level for who want to climb to the top'
    },
    {
        id: 2,
        name: 'Level 2',
        description: 'Climber acquire fire weapon'
    },
    {
        id: 3,
        name: 'Level 3',
        description: 'Climber acquire metal shield'
    },
];
describe("Testing my_worlds model", () => {
    describe('Tesing create function', () => {
        it('Testing create, expecting to new world', () => __awaiter(void 0, void 0, void 0, function* () {
            const world = JSON.parse(JSON.stringify(dummyWorld[0]));
            const result = yield store.create(world);
            expect(result.name).toEqual(world.name);
        }));
        it('Testing create, expecting to new world', () => __awaiter(void 0, void 0, void 0, function* () {
            const world = JSON.parse(JSON.stringify(dummyWorld[1]));
            const result = yield store.create(world);
            expect(result.name).toEqual(world.name);
        }));
        it('Testing create, expecting to new world', () => __awaiter(void 0, void 0, void 0, function* () {
            const world = JSON.parse(JSON.stringify(dummyWorld[2]));
            const result = yield store.create(world);
            expect(result.name).toEqual(world.name);
        }));
    });
    describe("Testing index function", () => {
        it('Testing index, expecting to get 3 worlds', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result.length).toEqual(3);
        }));
    });
    describe('Testing show function', () => {
        it('Expecting get a world', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(1);
            expect(result.name).toEqual(dummyWorld[0].name);
        }));
        it('Expecting get an error', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.show(4)).toBeRejectedWithError();
        }));
    });
    describe('Testing update function', () => {
        it('Expecting get a world', () => __awaiter(void 0, void 0, void 0, function* () {
            const world = dummyWorld[1];
            world.description = "Climber get a ice spear";
            const result = yield store.update(2, world);
            expect(result.description).toEqual("Climber get a ice spear");
        }));
        it('Expecting get an error', () => __awaiter(void 0, void 0, void 0, function* () {
            const world = dummyWorld[0];
            world.description = "Climber get a ice spear";
            yield expectAsync(store.update(4, world)).toBeRejectedWithError();
        }));
    });
    describe('Testing delete function', () => {
        it('Expecting delete a world', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.delete(1);
            expect(result.name).toEqual(dummyWorld[0].name);
        }));
        it('Expecting an error, deleted world can not be found', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.show(1)).toBeRejectedWithError();
        }));
        it('Expecting an error, the world does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expectAsync(store.show(5)).toBeRejectedWithError();
        }));
    });
});
