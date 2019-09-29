function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {

  let exprArray = [];  // in array
  
  let numTemp = "";
  for (let char of expr) { 
    if (char !== " ") { 
      if (isFinite(char)) {    //если char цифра, то добавляем его к numTemp чтобы получить число
        numTemp += char;
      } else { // это оператор или скобка
        if (numTemp !== "") { // если есть число, добавляем его в output
          exprArray.push(numTemp);
          numTemp = "";
        }
        exprArray.push(char);
      }
    }
  }
  if (numTemp !== "") { // проверяем последнее число
    exprArray.push(numTemp);
    numTemp = "";
  }

  let operators = {'+': 1, '-': 1, '*': 2, '/': 2};
  let output = []; 
  let stackOperators = [];
  for (let i = 0; i < exprArray.length; i++) {
    if ((parseInt(exprArray[i])) || (exprArray[i] === "0")) {  //if number push
      output.push(exprArray[i]);
    }

    if (exprArray[i] in operators) {  // if operator
      while ((stackOperators[stackOperators.length-1] in operators) &&
       (operators[exprArray[i]] <= operators[stackOperators[stackOperators.length-1]])) {
         output.push(stackOperators.pop());
       }
      stackOperators.push(exprArray[i]);
    }

    if (exprArray[i] === "(") {
      stackOperators.push(exprArray[i]);
    }

    if (exprArray[i] === ")") {
      while (stackOperators[stackOperators.length-1] != "(") {
        if (stackOperators.length == 0) {
          throw new Error('ExpressionError: Brackets must be paired');
        }
        output.push(stackOperators.pop());
        
      }
      stackOperators.pop();
    }
  }

  output = output.concat(stackOperators.reverse());

  let stack = [];
  let oper1 = "";
  let oper2 = "";
  let result = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i] == "(") {
      throw new Error('ExpressionError: Brackets must be paired');
    }
    if (!(parseInt(output[i])) && output[i] !== "0") {
      oper1 = stack.pop();
      oper2 = stack.pop();
      if (output[i] == "*") {
        result = +oper1 * +oper2;
        result = result.toFixed(15);
      } else if (output[i] == "/") {
        if (oper1 != "0") {
          result = +oper2 / +oper1;
          result = result.toFixed(15);
        } else {
          throw new Error('TypeError: Division by zero.');
        }
      } else if (output[i] == "+") {
        result = +oper1 + +oper2;
        result = result.toFixed(15);
      } else if (output[i] == "-") {
        result = +oper2 - +oper1;
        result = result.toFixed(15);
      }
      stack.push(result);
    } else {
      stack.push(output[i]);
    }
  }

  return Number(stack.pop());

}



module.exports = {
  expressionCalculator
}