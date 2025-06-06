import { useState } from "react";
import { Button } from "./ui/button";

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

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const calculateResult = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-800 text-right">
        <div className="text-3xl font-mono text-white overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-2 bg-gray-200">
        <Button 
          variant="outline" 
          className="bg-gray-100 hover:bg-gray-200 text-xl p-4"
          onClick={clearDisplay}>
          C
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-100 hover:bg-gray-200 text-xl p-4"
          onClick={() => setDisplay(display.slice(0, -1) || "0")}>
          ←
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-100 hover:bg-gray-200 text-xl p-4"
          onClick={() => setDisplay(String(parseFloat(display) * -1))}>
          ±
        </Button>
        <Button 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl p-4"
          onClick={() => performOperation("/")}>
          ÷
        </Button>
        
        {[7, 8, 9].map(num => (
          <Button 
            key={num}
            variant="outline" 
            className="bg-white hover:bg-gray-100 text-xl p-4"
            onClick={() => inputDigit(String(num))}>
            {num}
          </Button>
        ))}
        <Button 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl p-4"
          onClick={() => performOperation("*")}>
          ×
        </Button>
        
        {[4, 5, 6].map(num => (
          <Button 
            key={num}
            variant="outline" 
            className="bg-white hover:bg-gray-100 text-xl p-4"
            onClick={() => inputDigit(String(num))}>
            {num}
          </Button>
        ))}
        <Button 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl p-4"
          onClick={() => performOperation("-")}>
          −
        </Button>
        
        {[1, 2, 3].map(num => (
          <Button 
            key={num}
            variant="outline" 
            className="bg-white hover:bg-gray-100 text-xl p-4"
            onClick={() => inputDigit(String(num))}>
            {num}
          </Button>
        ))}
        <Button 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl p-4"
          onClick={() => performOperation("+")}>
          +
        </Button>
        
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-100 text-xl p-4 col-span-2"
          onClick={() => inputDigit("0")}>
          0
        </Button>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-100 text-xl p-4"
          onClick={inputDecimal}>
          .
        </Button>
        <Button 
          variant="outline" 
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl p-4"
          onClick={calculateResult}>
          =
        </Button>
      </div>
    </div>
  );
}