const displayBox = document.querySelector(".display"),
     displayInput = document.querySelector(".display-input"),
     displayResult = document.querySelector(".display-result"),
     buttons = document.querySelectorAll("button");
     operators = ["+", "-", "*", "/", "%"];
let input= "",
     result = "",
     lastCalculation = false;


//main function to handle calculator logic
const calculate = btnValue => {

    const lastChar = input.slice(-1),
    secondToLastChar = input.slice(-2, -1),
    withoutLastChar = input.slice(0, -1),
    isLastCharOperator = operators.includes(lastChar),
    isInvalidResult = ["Error!", "Infinite"].includes(result);



    //handle equals
    if (btnValue === "=") {

        if (
            input === "" ||
            lastChar === "." ||
            lastChar === "(" ||
            isLastCharOperator && lastChar !== "%" ||
            lastCalculation
        ) return;
        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = eval(formattedInput);
            result = parseFloat(calculatedValue.toFixed(10)).toString();
        } catch {
            result = "Error!";
        }
        input += btnValue;
        lastCalculation = true; // Mark that the last action was a calculation
        displayBox.classList.add("active");
    } 


    //handle AC (All clear)
    else if (btnValue === "AC") {
        resetCalculator("");
    } 


    // handle backspace
    else if (btnValue === "") {
        if (lastCalculation){
            if(isInvalidResult) (resetCalculator(""));
            resetCalculator(result.slice(0. -1));
        }
        else input = withoutLastChar;        
    }


    //handle operators
    else if (operators.includes(btnValue)){
        if(lastCalculation){
            if(isInvalidResult) return;
            resetCalculator(result + btnValue);
        }
        else  if(
        (input === "" || lastChar === "(") && btnValue !== "-" ||
        input === "-" ||
        lastChar === "." ||
        secondToLastChar === "(" && lastChar === "-" ||
        (secondToLastChar === "%" || lastChar === "%") && btnValue === "%")
        return;
        else if ( lastChar === "%" ) input += btnValue;
        else if (isLastCharOperator) input = withoutLastChar + btnValue;
        else input += btnValue;
    }




    //handle numbers and operators
    else {
        // If the last action was a calculation and the new input is not an operator, reset for a new calculation
        if (lastCalculation) resetCalculator(btnValue);
        else input += btnValue;
            
    }

    //update display
    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
};


// function to replace division and multiplication symbol with javascript-compatible operators ('/' and '*').
const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("×", "*");


//function to reset calculator state with a new input value

const resetCalculator = newInput => {
    input = newInput;
    result = "";
    lastCalculation = false;
    displayBox.classList.remove("active");
};


//add event listener to buttons, call calculate() on click
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.textContent));
});