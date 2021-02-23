let flash = true;
const operators = {
    "+": add,
    "-": subtract,
    "÷": divide,
    "*": multiply
}
let panel = document.querySelectorAll("button").forEach(item => {
    item.addEventListener('click',function(){
        panelText.innerText = item.innerText;
        panelInput.appendChild(panelText);
        switch(panelText.textContent){
            case "C":
                console.log("Clear.")
                panelInput.innerText = "";
                break;
            case "=":
                console.log("Calculate result.")
                userInput = panelInput.innerText;
                userInput = userInput.replace(/\s+/g, '')
                user_operator = userInput[1]; //multi digit numbers mess all of this up
                console.log(user_operator)
                answer = operate(Number(userInput[0]),Number(userInput[2]),operators[user_operator])
                console.log(answer);
                panelInput.innerText = answer;
                
                break;
        }
    })
})


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

function operate(num1,num2,operator){
    return operator(num1,num2);
}

function selectValue(){
    // pike = document.getElementById("pike");
    // pike.textContent = "";
    panelInput = document.getElementById("panel-input");
    panelText = document.createElement("p");
    
}

// function flashPanel(flash){
//     if(flash){
//         pike.textContent = "";
//         return;
//     }
//     pike = document.getElementById("pike");
//     pike.textContent = "|";
// }

// function flashContent(){
//     flash = !flash;
//     flashPanel(flash)
// }

// setInterval(flashContent,1000);

