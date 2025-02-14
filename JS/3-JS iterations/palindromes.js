//1
 function isPalindrome (str) { 
    // Your code here 
    const smallStr=str.toLowerCase().replaceAll(",","").replaceAll(" ","").replaceAll("?","").replaceAll("!","")
    const reverse=smallStr.split("").reverse().join("")
    if(reverse==smallStr){
        return true
    }
    else {
        return false
    }
    
    } 
    // Test Cases 
    console.log(isPalindrome('A man, a plan, a canal, Panama')); //true
    console.log(isPalindrome('Was it a car or a cat I saw?')); // true 
    console.log(isPalindrome('Hello, World!')); // false
//2
function reverse(str){
return str.split("").reverse().join("")
}
console.log(reverse("myname"))
//3
function longestPalindromicSubstring(s) { 
    // Your code here
    const s1=s.split("")
    const s2=s.split("").reverse()
    let arr=[]
    for(let i=0; i < s1.length; i++){
        if(s1[i]==s2[i]){
            arr.push(s1[i])
        }
        else{
            continue
        }
       
    }
    return arr.join("")
} 
    // Test Cases 
    console.log(longestPalindromicSubstring('babad')); 
    // Output: 'bab' or 'aba' 
    console.log(longestPalindromicSubstring('cbbd')); 
    // Output: 'bb'
//4
function areAnagrams (str1, str2) { 
    // Your code here 
    const sStr=(str)=>str.toLowerCase().split("").sort().join("")
    return sStr(str1)==sStr(str2)
}
    // Test Cases 
    console.log(areAnagrams('Listen', 'Silent')); 
    // true 
    console.log(areAnagrams('Hello', 'World')); 
    // false
//5
function removeDuplicates(str){
    let letter = new Set();
    let str2 = '';

    for (let char of str) {
        if (!letter.has(char)) {
            letter.add(char);
            str2 += char;
        }
    }
    return str2;
}

console.log(removeDuplicates('programming')); 
// Output: 'progamin' 
console.log(removeDuplicates('hello world')); 
// Output: 'helo wrd' 
console.log(removeDuplicates('aaaaa')); 
// Output: 'a' 
console.log(removeDuplicates('abcd')); 
// Output: 'abcd' 
console.log(removeDuplicates('aabbcc')); 
// Output: 'abc'

//6
function countPalindromes(str){
let n = str.length;
    let palindromes = new Set();

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let substring = str.substring(i, j + 1);
            if (substring === substring.split('').reverse().join('')) {
                palindromes.add(`${i},${j}`);
            }
        }
    }

    return palindromes.size;
}
console.log(countPalindromes('ababa')); 
// Output: 7 
console.log(countPalindromes ("racecar")); 
// Output: 7 
// Output: 4 
console.log(countPalindromes('aabb')); 
console.log(countPalindromes('a')); 
// Output: 1 
console.log(countPalindromes('abc')); 
// Output: 3

//7
function longestCommonPrefix(strs){
 if (!strs.length) return "";

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (!prefix) return "";
        }
    }
    return prefix;
}
console.log(longestCommonPrefix (['flower', 'flow', 'flight'])); // Output: 'fl' 
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); 
// Output: ''
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])); // 'inters'
console.log(longestCommonPrefix(['prefix', 'prefixes', 'preform'])); // Output: 'pref' 
console.log(longestCommonPrefix(['apple', 'banana', 'cherry'])); // Output:

//8
 function isCaseInsensitivePalindrome (str) { 
    // Your code here 
    const smallStr=str.toLowerCase()
    const reverse=smallStr.split("").reverse().join("")
    if(reverse==smallStr){
        return true
    }
    else {
        return false
    }
    } 
console.log(isCaseInsensitivePalindrome('Aba')); // Output: true 
console.log(isCaseInsensitivePalindrome('Racecar')); // Output: true 
console.log(isCaseInsensitivePalindrome('Palindrome')); // Output: false 
console.log(isCaseInsensitivePalindrome('Madam')); // Output: true 
console.log(isCaseInsensitivePalindrome('Hello')); // Output: false
