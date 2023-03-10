const allNumButtons = document
  .getElementById("nums")
  .querySelectorAll(".btn_num");
const allOperands = document
  .getElementById("operands")
  .querySelectorAll(".btn_operand");

let placeForNums = document.getElementById("result");

let num1 = "";
let num2 = "";
let result = "";
let operand = "";

// Functions
const add = (num1, num2) => {
  result = +num1 + +num2;
};

const substract = (num1, num2) => {
  result = +num1 - +num2;
};

const multiply = (num1, num2) => {
  result = +num1 * +num2;
};

const divide = (num1, num2) => {
  if (num2 === "0") {
    result = "ERROR";
  } else {
    result = +num1 / +num2;
  }
};

function getValuesFromKeys(e) {
  let regex = /^-?\d*\.?\d*$/;
  const num = document.querySelector(`.btn_num[data-value="${e.key}"]`);
  if (!num) return;
  if (operand === "") {
    if (regex.test(num.value)) {
      placeForNums.value = "";
      num1 += num.value;
      placeForNums.placeholder += num.value;
    }
    if (num1.includes(".")) {
      allNumButtons[10].value = "";
    } else {
      allNumButtons[10].value = ".";
    }
    if (num.value === "ce" && num1 !== "") {
      num1 = num1.slice(0, num1.length - 1);
      placeForNums.placeholder = num1;
    }
  } else if (num2 === "" && operand !== "") {
    if (regex.test(num.value)) {
      num2 += num.value;
      placeForNums.placeholder = "";
      placeForNums.placeholder += num.value;
    }
    if (num2.includes(".")) {
      allNumButtons[10].value = "";
    } else {
      allNumButtons[10].value = "";
    }
    if (num.value === "ce" && num2 !== "") {
      num2 = num2.slice(0, num2.length - 1);
      placeForNums.placeholder = num2;
    }
  } else {
    if (regex.test(num.value)) {
      num2 += num.value;
      placeForNums.placeholder += num.value;
    }
    if (num2.includes(".")) {
      allNumButtons[10].value = "";
    } else {
      allNumButtons[10].value = ".";
    }
    if (num.value === "ce" && num2 !== "") {
      num2 = num2.slice(0, num2.length - 1);
      placeForNums.placeholder = num2;
    }
  }
}

function getOperandFromKeys(e) {
  let regex = /[+-c*/=]/;
  const sign = document.querySelector(`.btn_operand[data-operand="${e.key}"`);
  if (!sign) return;
  allNumButtons[10].value = ".";

  if (num1 !== "" && regex.test(sign.dataset.operand)) {
    operand += sign.dataset.operand;

    switch (operand) {
      case "=":
        operate();
        break;
      case "c":
        operate();
        break;
    }

    if (operand.length === 2) {
      operate();
    }
  }
  console.log(operand);
}

function getValuesForOperation(e) {
  let regex = /^-?\d*\.?\d*$/;
  if (operand === "") {
    if (e.target.value === "." || num1.includes(".")) {
      allNumButtons[10].disabled = true;
    } else {
      allNumButtons[10].disabled = false;
    }
    if (regex.test(e.target.value)) {
      placeForNums.value = "";
      num1 += e.target.value;
      placeForNums.placeholder += e.target.value;
    }
    if (e.target.value === "ce" && num1 !== "") {
      num1 = num1.slice(0, num1.length - 1);
      placeForNums.placeholder = num1;
    }
  } else if (num2 === "") {
    if (e.target.value === "." || num2.includes(".")) {
      allNumButtons[10].disabled = true;
    } else {
      allNumButtons[10].disabled = false;
    }
    if (regex.test(e.target.value)) {
      num2 += e.target.value;
      placeForNums.placeholder = "";
      placeForNums.placeholder += e.target.value;
    }
    if (e.target.value === "ce" && num2 !== "") {
      num2 = num2.slice(0, num2.length - 1);
      placeForNums.placeholder = num2;
    }
  } else {
    if (e.target.value === "." || num2.includes(".")) {
      allNumButtons[10].disabled = true;
    } else {
      allNumButtons[10].disabled = false;
    }
    if (regex.test(e.target.value)) {
      num2 += e.target.value;
      placeForNums.placeholder += e.target.value;
    }
    if (e.target.value === "ce" && num2 !== "") {
      num2 = num2.slice(0, num2.length - 1);
      placeForNums.placeholder = num2;
    }
  }
}

function getOperandForOperation(e) {
  allNumButtons[10].disabled = false;
  if (num1 !== "") {
    operand += this.dataset.operand;

    switch (operand) {
      case "=":
        operate();
        break;
      case "c":
        operate();
        break;
    }

    if (operand.length === 2) {
      operate();
    }
  }
}

function operate() {
  if (operand.length === 1) {
    switch (operand) {
      case "=":
        placeForNums.value = num1;
        placeForNums.placeholder = "";
        num1 = "";
        operand = "";
        break;

      case "c":
        placeForNums.placeholder = "";
        num1 = "";
        num2 = "";
        operand = "";
        break;
    }
  } else if (operand.length === 2) {
    switch (operand[0]) {
      case "+":
        if (operand[1] === "=") {
          add(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          result = "";
          num1 = "";
          num2 = "";
          operand = "";
        } else if (operand[1] !== "=") {
          add(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          num1 = result.toString();
          result = "";
          num2 = "";
          operand = operand.slice(1);
        }
        break;

      case "-":
        if (operand[1] === "=") {
          substract(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          result = "";
          num1 = "";
          num2 = "";
          operand = "";
        } else if (operand[1] !== "=") {
          substract(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          num1 = result.toString();
          result = "";
          num2 = "";
          operand = operand.slice(1);
        }
        break;

      case "*":
        if (operand[1] === "=") {
          multiply(num1, num2);
          placeForNums.value = result.toFixed(2);
          placeForNums.placeholder = "";
          result = "";
          num1 = "";
          num2 = "";
          operand = "";
        } else if (operand[1] !== "=") {
          multiply(num1, num2);
          placeForNums.value = result.toFixed(2);
          placeForNums.placeholder = "";
          num1 = result.toString();
          result = "";
          num2 = "";
          operand = operand.slice(1);
        }
        break;

      case "/":
        if (operand[1] === "=") {
          divide(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          if (result === "ERROR") {
            result = "";
            num1 = "";
            num2 = "";
            operand = "";
          } else {
            result = "";
            num1 = "";
            num2 = "";
            operand = "";
          }
        } else if (operand[1] !== "=") {
          divide(num1, num2);
          placeForNums.value = result;
          placeForNums.placeholder = "";
          if (result === "ERROR") {
            result = "";
            num1 = "";
            num2 = "";
            operand = "";
          } else {
            num1 = result.toString();
            result = "";
            num2 = "";
            operand = operand.slice(1);
          }
        }
    }
  }
}

// EventListeners
window.addEventListener("keydown", getValuesFromKeys);
window.addEventListener("keydown", getOperandFromKeys);
allNumButtons.forEach((btn) =>
  btn.addEventListener("click", getValuesForOperation)
);
allOperands.forEach((btn) =>
  btn.addEventListener("click", getOperandForOperation)
);
allOperands[allOperands.length - 1].addEventListener("click", () => {
  result = "";
  num1 = "";
  num2 = "";
  operand = "";
  placeForNums.value = "";
  placeForNums.placeholders = "";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    result = "";
    num1 = "";
    num2 = "";
    operand = "";
    placeForNums.value = "";
    placeForNums.placeholders = "";
  }
});
