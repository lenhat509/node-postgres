import {World, WorldStore} from '../../models/my_worlds';

const store = new WorldStore();
const dummyWorld: World[] = [
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
]
describe("Testing my_worlds model", () => {
    
    describe('Tesing create function', () => {
        it('Testing create, expecting to new world', async () => {
            const world: World = JSON.parse(JSON.stringify(dummyWorld[0]));
            const result = await store.create(world);
            expect(result.name).toEqual(world.name);
        })
        it('Testing create, expecting to new world', async () => {
            const world: World = JSON.parse(JSON.stringify(dummyWorld[1]));
            const result = await store.create(world);
            expect(result.name).toEqual(world.name);
        })
        it('Testing create, expecting to new world', async () => {
            const world: World = JSON.parse(JSON.stringify(dummyWorld[2]));
            const result = await store.create(world);
            expect(result.name).toEqual(world.name);
        })
    })
    describe("Testing index function", () => {
        it('Testing index, expecting to get all world', async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        })
    })
    describe('Testing show function', () => {
        it('Expecting get a world', async() => {
            const result = await store.show(1);
            expect(result.name).toEqual(dummyWorld[0].name);
        })
        it('Expecting get an error', async() => {
            expect(() => {
                store.show(4)
            }).toThrowError(Error);
        })
    })
    describe('Testing update function', () => {
        it('Expecting get a world', async() => {
            const world: World = dummyWorld[1];
            world.description = "Climber get a ice spear";
            const result = await store.update(2, world);
            expect(result.description).toEqual("Climber get a ice spear");
        })
        it('Expecting get an error', async() => {
            const world: World = dummyWorld[0];
            world.description = "Climber get a ice spear";
            const result = await store.update(4, world);
            expect(result).toThrowError();
        })
    })
    describe('Testing delete function', () => {
        it('Expecting delete a world', async() => {
            const result = await store.delete(1);
            expect(result.name).toEqual(dummyWorld[0].name);
        })
        it('Expecting an error, deleted world can not be found', async() => {
            const result = await store.show(1);
            expect(result).toThrowError();
        })
        it('Expecting an error, the world does not exist', async() => {
            const result = await store.show(5);
            expect(result).toThrowError();
        })
    })
    
})