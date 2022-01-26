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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const myFn = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id == 0)
                throw new Error("This is 0");
            return id;
        }
        catch (error) {
            throw new Error(`New Error ${error}`);
        }
    });
    let result1, result2;
    try {
        result1 = yield myFn(0);
        result2 = yield myFn(1);
    }
    catch (error) {
        console.log(error);
    }
    console.log(result1);
    console.log(result2);
});
main();
