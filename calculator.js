var firstArg = null;            // first argument
var secondArg = "0";            // second argument
var operator = null;            // which operation we're performing
finalized = false;              // if true, the displayed number is a result of a previous calculation and cannot be edited


function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function testFuncs() {
    console.log(add(8, 2));
    console.log(subtract(8, 2));
    console.log(multiply(8, 2));
    console.log(divide(8, 2));
}

function operate(x, opp, y) {
    if (opp === "+") {
        return x + y;
    } else if (opp === "-") {
        return x - y;
    } else if (opp === "*") {
        return x * y;
    } else if (opp === "/") {
        if (y === 0) {
            firstArt = null;
            operator = null;
            secondArg = "Nope!";
            finalized = true;
            updateDisplay();
            return secondArg;
        } else {
            return x / y;
        }
    } else if (opp === "^") {
        return x ** y;
    } else if (opp === "√") {
        return x ** (1 / y);
    } else if (opp === "log") {
        return Math.log(x) / Math.log(y);
    }
}

function testOperate() {
    console.log(operate(8, '+', 2));
    console.log(operate(8, '-', 2));
    console.log(operate(8, '*', 2));
    console.log(operate(8, '/', 2));
    console.log(operate(8, '^', 2));
    console.log(operate(8, '√', 2));
    console.log(operate(8, 'log', 2));
}

function updateDisplay() {
    const displayPara = document.querySelector('#calc-display');

    if (firstArg && operator && secondArg) {
        displayPara.textContent = `${firstArg} ${operator} ${secondArg}`;
        return;
    } 

    displayPara.textContent = secondArg;
}

function doClear() {
    // Clear the current entry
    secondArg = "0";
    updateDisplay();
}

function doFlash() {
    const displayPara = document.querySelector('#calc-body');
    displayPara.style.background = '#af0000';
    setTimeout(() => {
        displayPara.style.background = '#ddd';
    }, 150);
}

function setOperator(oper) {
    // set the operation we'll be performing when the equals button is pushed
    console.log(`Setting operation to ${oper}.`);

    if (firstArg) {
        console.log("We should be performing the stored operation, but we're just jettisoning it instead. #FIXME");
    }

    firstArg = secondArg;
    operator = oper; 
    secondArg = "0";

    updateDisplay();
}

function doEquals() {
    if (!firstArg || !operator) {
        doFlash();
        console.log("You need to enter two numbers and an operator before pushing the = button.");
        return;
    }

    result = operate(Number(firstArg), operator, Number(secondArg));
    if (isNaN(result)) {
        doFlash();
        console.log(`Got non-numeric result ${result} when trying to do math!`);
        return;
    }

    firstArg = null; 
    operator = null;
    secondArg = String(result);
    finalized = true;

    updateDisplay();
}

function entryButton(what) {
    // add the relevant digit to the secondArg variable
    if (finalized) {
        secondArg = `${what}`;
        finalized = false;
        updateDisplay();
        return;
    }
    
    if (what == ".") {
        if (secondArg.indexOf('.') !== -1) {
            doFlash();
            console.log("You can only add one decimal point to a number");
            return;
        }
    }

    if (secondArg == "0") {
        if (what == '.') {
            secondArg = "0.";
        } else {
            secondArg = `${what}`;
        }
    } else {
        secondArg = `${secondArg}${what}`;
    }
    updateDisplay();
}

