 console.log("hiiiii")
type Rectangle={
    width:number;
    height:number
}
const getRectangleArea = (rectangle: Rectangle) => { 
    return rectangle.width* rectangle.height; 
    }; 

    const getRectanglePerimeter = (rectangle: Rectangle
    ) => { 
    return 2* (rectangle.width + rectangle.height); 
    };

    let area1:Rectangle={
        width:20,
        height:50
    }
    console.log(getRectangleArea(area1))
    console.log(getRectanglePerimeter(area1))

    type Recipe = {
        title: string;
        instructions: string;
        ingredients:Array<{}>
      };
      
      const processRecipe = (recipe: Recipe) => {
        // Do something with the recipe in here
      };
      
      processRecipe({
        title: "Chocolate Chip Cookies",
        ingredients: [
          { name: "Flour", quantity: "2 cups" },
          { name: "Sugar", quantity: "1 cup" },
        ],
        instructions: "...",
      });
//EXAMPLES
    //1. Reverse a String
      function reverseString(str: string): string {
        return str.split("").reverse().join("");
    }
    console.log(reverseString("hello")); // "olleh"
   // 2. Find the Maximum Number
   
    function findMax(arr: number[]): number {
        return Math.max(...arr);
    }
    console.log(findMax([3, 7, 1, 9, 4])); // 9
   // 3. Check if a Number is Prime
   
    function isPrime(num: number): boolean {
        if (num < 2) return false;
        for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    console.log(isPrime(7)); // true
    console.log(isPrime(10)); // false
   // 4. Fibonacci Sequence
   
    function fibonacci(n: number): number[] {
        let seq: number[] = [0, 1];
        for (let i = 2; i < n; i++) {
            seq.push(seq[i - 1] + seq[i - 2]);
        }
        return seq;
    }
    console.log(fibonacci(5)); // [0, 1, 1, 2, 3]
    //5. Check if Two Strings Are Anagrams
    
    function isAnagram(str1: string, str2: string): boolean {
        return str1.split("").sort().join("") === str2.split("").sort().join("");
    }
    console.log(isAnagram("listen", "silent")); // true
    console.log(isAnagram("hello", "world")); // false
    //6. Find the Factorial of a Number
   
    function factorial(n: number): number {
        return n === 0 ? 1 : n * factorial(n - 1);
    }
    console.log(factorial(5)); // 120
    //7. Remove Duplicates from an Array
   
    function removeDuplicates(arr: number[]): number[] {
        return [...new Set(arr)];
    }
    console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
    //8. Find Intersection of Two Arrays
   
    function arrayIntersection(arr1: number[], arr2: number[]): number[] {
        return arr1.filter(num => arr2.includes(num));
    }
    console.log(arrayIntersection([1, 2, 3, 4], [2, 4, 6])); // [2, 4]
    //9. Find the Missing Number in an Array
   
    function findMissingNumber(arr: number[], n: number): number {
        let sum = (n * (n + 1)) / 2;
        let arrSum = arr.reduce((acc, num) => acc + num, 0);
        return sum - arrSum;
    }
    console.log(findMissingNumber([1, 2, 4, 5], 5)); // 3
    //10. Implement a Stack
    
    class Stack<T> {
        private items: T[] = [];
    
        push(item: T): void {
            this.items.push(item);
        }
    
        pop(): T | undefined {
            return this.items.pop();
        }
    
        peek(): T | undefined {
            return this.items[this.items.length - 1];
        }
    
        isEmpty(): boolean {
            return this.items.length === 0;
        }
    }
    
    const stack = new Stack<number>();
    stack.push(10);
    stack.push(20);
    console.log(stack.pop()); // 20
    console.log(stack.peek()); // 10
    console.log(stack.isEmpty()); // false
   