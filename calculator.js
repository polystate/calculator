//Global Variables

let inputArr = [];
let operatorPressed = false;
let decimalPressed = false;
let divideByZero = false;
let currentOperator = undefined;


//Object Lookup Table

const operators = {
    "+": add,
    "-": subtract,
    "÷": divide,
    "*": multiply,
    "√": squareRoot,
    "𝑥^": exponent,
    "𝑥!": factorial
}

//Calculator Panel Object Itself

const calculatorPanel = document.querySelectorAll("button").forEach(item => {
    item.addEventListener('click',function(){
        
        displayInput(item);
        
        
        switch(userInput){
            case "+":
            case "-":
            case "÷":
            case "*":
                if(isNaN(inputArr[inputArr.length-1])) return;
                if(checkOperationReady()){
                    console.log("Now we will really solve. Place answer in display.");
                    answer = roundNumber(evaluateExpression());
                    
                    panelInput.innerText = answer;
                    inputArr = [];
                    inputArr.push(answer);
                }
                operatorPressed = true;
                decimalPressed = false;
                storeInput(userInput);
                currentOperator = inputArr[inputArr.length-1];
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                currentInput = storeInput(userInput);
                if(operatorPressed){
                    panelInput.innerText = inputArr[inputArr.length-1];
                    operatorPressed = false;
                } 
                break;
            case ".":
                if(inputArr.length === 0 || isNaN(inputArr[inputArr.length-1])) return;
                if(decimalPressed){
                    panelInput.innerText = panelInput.innerText.slice(0,-1);
                    panelInput.innerText = panelInput.innerText.replace(/\s+/g, "");
                    return;
                } 
                decimalPressed = true;
                storeInput(userInput);
                
                break;
            case "=":
                if(!checkOperationReady()) return;
                if(isNaN(inputArr[inputArr.length-1]) || inputArr.length === 1) return;
                answer = evaluateExpression();
                panelInput.innerText = roundNumber(answer);
                inputArr = [];
                inputArr.push(roundNumber(answer));
                break;
            case "C":
                clearAll();
                break;
        }
        checkOperationReady();
    })
})

function evaluateExpression(){
    for(let i = 0; i < inputArr.length; i++){
        if(isNaN(inputArr[i]) && inputArr[i] !== "."){
            num1 = inputArr.slice(0,i);
            num2 = inputArr.slice(i+1,inputArr.length);
            operator = inputArr[i];
            break;
        }
    }
    if(operator === "÷" && num2[0] == 0){
        alert("Dividing by zero is illegal in these parts.");
        divideByZero = true;
        return;
    } 
    num1 = num1.join("");
    num2 = num2.join("");
    return operate(Number(num1),Number(num2),operators[operator]);
}

function checkOperationReady(){
    //If user tries to divide by zero
    if(inputArr[0] === undefined){
        clearAll();
    } 

    for(let input of inputArr){
        if(isNaN(input)){
            console.log("Ready to solve and operate.")
            return true;
        }
    }
    return false;
}

function storeInput(input){
    if(decimalPressed){
        inputArr[inputArr.length-1] += input;
        return;
    }
    inputArr.push(input);
    console.log(inputArr);
    return inputArr;
}

function displayInput(item){
    if((inputArr.length === 0 || isNaN(inputArr[inputArr.length-1])) && item.innerText === "."){
        return;
    } 
    if((!isNaN(item.innerText) || (item.innerText === "."))){
        panelText.innerText = item.innerText;
        panelInput.appendChild(panelText);
        userInput = item.innerText;
        } else{
            userInput = item.innerText;
        } 
    
    //Check to make sure userinput doesn't exceed panel width
    panelText = panelInput.innerText.replace(/\s+/g, "");
    if(panelText.length > 16){
            userInput = "C";
    }
}

function selectValue(){
    panelInput = document.getElementById("panel-input");
    panelText = document.createElement("p");
}

function clearAll(){
    operatorPressed = false;
    decimalPressed = false;
    divideByZero = false;
    inputArr = [];
    panelInput.innerText = "";
}

function backSpace(){
    lastInput = inputArr[inputArr.length-1];
    if(!operatorPressed && !decimalPressed){
        inputArr.pop();
        panelInput.innerText = panelInput.innerText.replace(/\s+/g, "");
        panelArr = panelInput.innerText.split("");
        panelArr.pop();
        panelInput.innerText = panelArr.join("");
    } else if(decimalPressed){
        if(!checkOperationReady()){
        strInput = inputArr[inputArr.length-1];
        strInput = strInput.substring(0,strInput.length-1);
        inputArr[inputArr.length-1] = strInput;
        panelInput.innerText = inputArr.join("");
        } else if(checkOperationReady()){
            strInput = inputArr.join("");
            operationIndex = strInput.search(/[+|-|*|÷]/g);
            secondNumber = strInput.slice(operationIndex+1);
            secondNumber = secondNumber.substring(0,secondNumber.length-1);
            inputArr[inputArr.length-1] = secondNumber;
            panelInput.innerText = secondNumber;
        }
    }
}

function roundNumber(num){
    if(divideByZero) return;
    numStr = num.toString();
    parse = Number.parseFloat(numStr).toPrecision(10);
    parse = Number(parse);
    if(parse.toString().length > 16 && decimalPressed === false){
        parse = parse.toExponential();
    }
    return parse;
}

function operate(num1,num2,operator){
    return operator(num1,num2);
}

function add(num1,num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    return num1/num2;
}

function squareRoot(){
    num = panelInput.innerText.replace(/\s+/g, "");
    if(num === "") return;
    num = Math.sqrt(num);
    if(num < 0 || answer < 0){
        clearAll();
        return;
    } 
    panelInput.innerText = roundNumber(num);
    answer = roundNumber(num);
    inputArr = [];
    inputArr.push(answer);
}

function exponent(num1,power){
    answer = 1;
    for(let i = 0; i < power; i++){
        answer *= num1;
    }
    return answer;
}

function factorial(){
    num = panelInput.innerText.replace(/\s+/g, "");
    if(num === "") return;
    if(num > 170){
        panelInput.innerHTML = Infinity + " :(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        inputArr.push(Infinity);
        setTimeout(clearAll,1500);
        return;
    }
    count = num - 1;
    while(count > 0){
        num = num * count;
        count--;
    }
    panelInput.innerText = roundNumber(num);
    answer = roundNumber(num);
    inputArr = [];
    inputArr.push(answer);
}