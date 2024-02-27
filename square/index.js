import Square from "./square.js";
import Timeout from "./promise.js"

const obj = new Square(3);

console.log(`Area of 3 will be ${obj.area()}`)

try {
    console.log('Successful', await Timeout)
} catch (error) {
    console.log('Error', error)
} finally {
    console.log('Finally')
}

