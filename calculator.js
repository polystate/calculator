let numberSwitch = true;
let inputArr = [];

const operators = {
    "+": add,
    "-": subtract,
    "÷": divide,
    "*": multiply
}

const calculatorPanel = document.querySelectorAll("button").forEach(item => {
    item.addEventListener('click',function(){
        if(inputArr[inputArr.length-1] !== "." && (!isNaN(item.innerText) || (item.innerText === "."))){
        panelText.innerText = item.innerText;
        panelInput.appendChild(panelText);
        userInput = item.innerText;
        } else{
            userInput = item.innerText;
        } 
        
        switch(userInput){
            case "+":
            case "-":
            case "÷":
            case "*":
                console.log("Operator");
                if(isNaN(inputArr[inputArr.length-1])) return;
                if(checkOperationReady()){
                    console.log("Now we will really solve. Place answer in display.");
                    answer = evaluateExpression();
                    panelInput.innerText = answer;
                    inputArr = [];
                    inputArr.push(answer);
                }
                storeInput(userInput);
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
                console.log("Regular Digit");
                storeInput(userInput);
                if(inputArr.length > 1) panelInput.innerText = inputArr[inputArr.length-1];
                break;
            case ".":
                console.log("Decimal");
                if(inputArr[inputArr.length-1] === ".") return;
                storeInput(userInput);
                break;
            case "=":
                console.log("Equals");
                if(isNaN(inputArr[inputArr.length-1]) || inputArr.length === 1) return;
                answer = evaluateExpression();
                panelInput.innerText = answer;
                inputArr = [];
                inputArr.push(answer);
                break;
            case "C":
                console.log("Clears");
                inputArr = [];
                panelInput.innerText = "";
                break;
        }
        checkOperationReady();
    })
    
})



function numSwitch(){
    if(numberSwitch){
        num1 = storeInput(userInput);
        numberSwitch = false;
    } else if(!numberSwitch){
        num2 = storeInput(userInput);
        numberSwitch = true;
    }
}

function evaluateExpression(){
    for(let i = 0; i < inputArr.length; i++){
        if(isNaN(inputArr[i])){
            num1 = inputArr.slice(0,i);
            num2 = inputArr.slice(i+1,inputArr.length);
            operator = inputArr[i];
            break;
        }
    }
    num1 = num1.join("");
    num2 = num2.join("");
    return operate(Number(num1),Number(num2),operators[operator]);
}

function checkOperationReady(){
    // numStr = inputArr.join("");
    // for(let str of numStr){
    //     switch(str){
    //         case "+":
    //         case "-":
    //         case "*":
    //         case "÷":
    //             break;
    //         case ".":
    //             console.log("Decimal inputted.")
    //             if(isNaN(numStr[numStr.length-1])) return false;
    //     }
    // }

    for(let input of inputArr){
        if(isNaN(input) && !isNaN(inputArr[inputArr.length-1])){
            console.log("Ready to solve and operate.")
            return true;
        }
    }
    return false;
}

function storeInput(input){
    inputArr.push(input);
    console.log(inputArr);
    return inputArr;
}

function selectValue(){
    panelInput = document.getElementById("panel-input");
    panelText = document.createElement("p");
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




/*
1. Number is Entered into Panel
2. Operator is pressed, first number remains in panel.
3. [Second Number is entered and clears screen/replaces first number.]
4. [Second Operator is entered, the screen is cleared, and the answer of the first three steps appears on the screen.]
[Note: It is right here that answer replaces the first number that is entered variable if necessary.]
5. [Third Number is entered and clears screen, replacing answer.]
6. [Fourth Operator is entered, the screen is cleared, and the answer of the previous two steps appears on the screen.]
7. [Steps 4-6 basically loop and repeat themselves. Steps 1-3 unique.]
*/



/*Fixes
    1. Fix problems with decimal point.
    2. Allow multiple digits to be typed into panel without
    overwriting. The only time number should overwrite is if it involves
    'answer' I believe.
*/