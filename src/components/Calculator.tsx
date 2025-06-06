import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    if (firstOperand === null || operator === null) {
      return parseFloat(display);
    }

    const secondOperand = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        result = firstOperand / secondOperand;
        break;
      default:
        return secondOperand;
    }

    return result;
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="bg-gray-800 text-white rounded-t-lg">
        <CardTitle className="text-xl">Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-white rounded-lg p-4 mb-4 text-right border">
          <div className="text-3xl font-medium text-gray-800 h-12 flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="bg-gray-200 hover:bg-gray-300 font-bold"
            onClick={clearDisplay}
          >
            C
          </Button>
          <Button
            variant="outline"
            className="bg-gray-200 hover:bg-gray-300 font-bold col-span-2"
            onClick={() => setDisplay(display.slice(0, -1) || "0")}
          >
            ⌫
          </Button>
          <Button
            variant="outline"
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold"
            onClick={() => handleOperator("/")}
          >
            ÷
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 font-medium"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold"
            onClick={() => handleOperator("*")}
          >
            ×
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 font-medium"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold"
            onClick={() => handleOperator("-")}
          >
            −
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 font-medium"
              onClick={() => inputDigit(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold"
            onClick={() => handleOperator("+")}
          >
            +
          </Button>

          <Button
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 font-medium col-span-2"
            onClick={() => inputDigit("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200 font-medium"
            onClick={inputDecimal}
          >
            .
          </Button>
          <Button
            variant="outline"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold"
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}