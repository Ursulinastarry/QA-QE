const display=document.getElementById("display")
const buttons=document.querySelector(".buttons")

buttons.addEventListener("click",(event)=>{
const target=event.target
const action=target.dataset.action
const value=target.value

if(!target.matches("button"))return
if(action==="number"){
appendToDisplay(value)
}
else if(action==="operator"){
    appendToDisplay(value)
}
else if(action==="clear"){
    clearDisplay()
}
else if(action==="delete"){
    deleteLast()
}
else if(action==="decimal"){
    decimal()
}
else if(action==="calculate"){
    calculateResult()
}
})

function appendToDisplay(value){
    display.value += value
}
function clearDisplay(value){
    display.value=""
}
function deleteLast(value){
     display.value=display.value.slice(0,-1)
}
function decimal(value){
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

