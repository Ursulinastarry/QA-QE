//1
function isString(input) {
    return typeof input === 'string' || input instanceof String;
  }
  
  console.log(isString("w3resource"));//true
  console.log(isString([1,2,4,0]));//false
//2
function isBlank(input){
    return input.trim() ===""
}
console.log(isBlank('')); // true
console.log(isBlank('abc')); // false
//3
function string_to_array(input){
return input.split('')
}
console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]
//4
function truncate_string(input,length){
return input.slice(0,length)
}
console.log(truncate_string("Robin Singh", 4)); // "Robi"
//5
function abbrev_name(inputs){ 
const input = inputs.split(' ')
return input[0] + (" ") + input[1].charAt(0).toUpperCase() + (".")
}
console.log(abbrev_name("Robin Singh")); // "Robin S."
//6
function protect_email(email){
    const[whole,domain]=email.split("@")
    const half=whole.substring(0,5)
    return half + ("...") + ("@") + domain

}
console.log(protect_email("robin_singh@example.com")); //robin...@example.com
//7*
function string_parameterize(words){
const small=words.toLowerCase()
const one=small.split(" ")
return one.map(words=>words.replace(" ")).join("-")
}
console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa
//8
function capitalize(words){
  return words.charAt(0).toUpperCase() + words.slice(1);

}
console.log(capitalize('js string exercises')); // "Js string exercises"
//9
function capitalize_Words(words){
const input=words.split(" ")
return input.map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
    .join(' ');

}
console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
//10
function swapcase(input){
  let swapped=""
  for (let char of input){
     swapped += (char===char.toUpperCase()?char.toLowerCase():char.toUpperCase())
  }
    return swapped
}
console.log(swapcase('AaBbc')); // "aAbBC"
//11
function camelize(words){
return words.replace(" ","")
}
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"
//12
function uncamelize(word,separator=(" ")) {
  const one=word.split(/(?=[A-Z])/)
 return (one[0] + separator + one.slice(1)).toLowerCase()
}
console.log(uncamelize('helloWorld'));      // "hello world"
console.log(uncamelize('helloWorld','-'));   // "hello-world"

//13
function repeat(input, num) {
    return input.repeat(num);
  }
  
console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
//14
function insert(mainInput, insertInput, pos) {
  return mainInput.slice(0, pos) + insertInput + mainInput.slice(pos);
}

console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
// "We are doing some JavaScript exercises."

//15
function humanize_format(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + "st";
    if (j === 2 && k !== 12) return num + "nd";
    if (j === 3 && k !== 13) return num + "rd";
    return num + "th";
  }
  
  console.log(humanize_format(301)); // "301st"
  //16
  function text_truncate(str, length, ending = '...') {
    if (str.length > length) {
      return str.slice(0, length - ending.length) + ending;
    }
    return str;
  }
  
  console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));
  // "We are doing !!"
  
  
  // 17
function string_chop(str, size) {
    let result = [];
    for (let i = 0; i < str.length; i += size) {
      result.push(str.slice(i, i + size));
    }
    return result;
  }
  
  console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
  //18*
  function count(mainStr, subStr) {
    // Make both strings lowercase for a case-insensitive search.
    mainStr = mainStr.toLowerCase();
    subStr = subStr.toLowerCase();
    let count = 0, pos = 0;
    while ((pos = mainStr.indexOf(subStr, pos)) !== -1) {
      count++;
      pos += subStr.length;
    }
    return count;
  }
  
  console.log(count("The quick brown fox jumps over the lazy dog", 'the')); // 2
  
  // 19.
  function reverse_binary(num) {
    const binaryStr = num.toString(2);
    const reversedBinary = binaryStr.split('').reverse().join('');
    return parseInt(reversedBinary, 2);
  }
  
  console.log(reverse_binary(100)); // 19
  
  // 20.
  function formatted_string(pad, num, side) {
    const numStr = num.toString();
    if (numStr.length >= pad.length) return numStr;
    
    // 'l' for left padding, 'r' for right padding.
    if (side === 'l') {
      return numStr.padStart(pad.length, pad[0]);
    } else if (side === 'r') {
      return numStr.padEnd(pad.length, pad[0]);
    }
    return numStr;
  }
  
  console.log(formatted_string('0000', 123, 'l')); // "0123"
  
  



