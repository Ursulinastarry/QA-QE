//1.empty array
let arrayName=[]

//2.accessing first element
const arrayName1=[1,2,3,4]
console.log(arrayName1[0])
//accessing last element
console.log(arrayName1[arrayName1.length-1])

//3.adding element to end of array
arrayName1.push(5)
console.log(arrayName1)

//4.remove last element from array
arrayName1.pop()
console.log(arrayName1)

//5.loop through array
arrayName1.forEach((arrayObject)=>{console.log(arrayObject)})
arrayName1.map((arrayObject)=>{return arrayObject})

//6.check if element is in array
arrayName1.push("lina")
console.log(arrayName1)
arrayName1.includes("lina")

//7.remove element at specific index
arrayName1.splice(2,1)
console.log(arrayName1)

//8.concat 2 arrays
arrayName.push("wambua")
console.log(arrayName)
console.log(arrayName.concat(arrayName1))

//flattening
function flattenArray(arr) {
    return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
    }, []);
    }
    var nestedArray = [1, [2, [3, 4], 5], 6];
    console.log(nestedArray.flat(1))

//array  manipulation
//1.difference between map and forEach:map returns values in an array while forEach doesnt return,only executes callback function
//2.see  above
/*3.difference between .filter() and .find():
.filter() returns a new array with all elements that pass a certain test provided by a
callback function.
.find() returns the value of the first element in the array that passes a certain test
provided by a callback function. */
//4.sorting array
arrayName1.push(3)
console.log(arrayName1)
console.log(arrayName1.sort())


