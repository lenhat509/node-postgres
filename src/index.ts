
const main = async () => {
    const myFn = async (id: number): Promise<number> => {
        try {
            if(id == 0)
                throw new Error("This is 0")
            return id;
        } catch (error) {
            throw new Error(`New Error ${error}`)
        }
        
    }
    let result1, result2;
    try {
        result1 = await myFn(0);
        result2 = await myFn(1);
    } catch (error) {
        console.log(error)
    } 
    console.log(result1);
    console.log(result2);
    
}

main();

