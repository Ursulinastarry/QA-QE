import chalk from "chalk"
let name="lina"
console.log(chalk.blue(name))
const marks='23'
console.log(parseInt(marks))
console.log(typeof '23')
console.log(marks)
console.log(4)
console.log(typeof 4)

const numIsBig=12344566788865343244566n
console.log(numIsBig)
const isAuthenticated = true
const isAdmin = false
//object
let myData={}
console.log(myData)
console.log(typeof myData)
myData.name="linaaa"
myData.uni="dkut"
console.table(myData)

//strings
//1.length
console.log("brahh".length)
//charAt()-char a index in word
console.log("brahh".charAt(3))
//concat -joining 2 strings
console.log("brahh".concat(' ' + "bebi"))
//indexOf-first occurrence of char
console.log("brahh".indexOf("a"))
//includes
console.log("brahh".includes("a"))//true
console.log("brahh".includes("A"))//false
//toLowerCase   toUpperCase
let name2="LINA2"
console.log(name2.toLowerCase())
//reverse-split first
let name3="LINA"
console.log(name3.split(""))
//substring-extracts characters from string in range index
console.log("i am a girl".substring(5,8))//index5-8
//substr
console.log("i am a girl".substr(8,2))//from index 8,2 characters
//trim-remove white spaces frm both ends of string
console.log('    brrrrr    ')
console.log('    brrrrr    '.trim())//trimStart-trims left space,trimEnd

//booleans














