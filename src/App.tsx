import { FC, useEffect, useState } from "react";
import "./App.css";
import { CommonPanel } from "./CommonPanel";
import { NumberPanel, NumberType, NUMBER_TYPE } from "./NumberPanel";
import { OperatorPanel, OperatorType, OPERATOR_TYPE } from "./OperatorPanel";

const appendNumber = (sbj: string | undefined, obj: string): string => {
  sbj = sbj ?? "";

  switch (obj) {
    case NUMBER_TYPE.DOT:
      if (sbj.includes(NUMBER_TYPE.DOT)) {
        return sbj;
      }
      return sbj + obj;

    case NUMBER_TYPE.ZERO:
      if (sbj === NUMBER_TYPE.ZERO) {
        return sbj;
      }
      return sbj + obj;

    default:
      if (sbj === NUMBER_TYPE.ZERO) {
        return obj;
      }
      return sbj + obj;
  }
};

const calculate = (n1: number, op: OperatorType, n2: number): number => {
  switch (op) {
    case OPERATOR_TYPE.PLUS:
      return n1 + n2;

    case OPERATOR_TYPE.MINUS:
      return n1 - n2;

    case OPERATOR_TYPE.MULTIPLY:
      return n1 * n2;

    case OPERATOR_TYPE.DIVIDE:
      if (n2 === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return n1 / n2;

    default:
      throw new Error("This line should not be reached.");
  }
};

export const App: FC = () => {
  const [n1, setN1] = useState("0");
  const [n2, setN2] = useState<string | undefined>();
  const [operator, setOperator] = useState<OperatorType | undefined>();
  const [display, setDisplay] = useState("0");

  const numberPanelClickHandler = (n: NumberType) => {
    if (operator) {
      setN2(appendNumber(n2, n));
    } else {
      setN1(appendNumber(n1, n));
    }
  };

  const operatorPanelClickHanlder = (op: OperatorType) => {
    if (n2) {
      setN1(calculate(+n1, op, +n2).toString());
      setN2(undefined);
    }
    setOperator(op);
  };

  const equalPanelClickHanlder = () => {
    if (n2) {
      setN1(calculate(+n1, operator!, +n2).toString());
      setN2(undefined);
      setOperator(undefined);
    }
  };

  const allClearPanelHandler = () => {
    setN1("0");
    setN2(undefined);
    setOperator(undefined);
  };

  const inversePanelHanlder = () => {
    if (n2) {
      setN2((+n2 * -1).toString());
    } else {
      setN1((+n1 * -1).toString());
    }
  };

  const percentPanelHandler = () => {
    if (n2) {
      setN2((+n2 / 100).toString());
    } else {
      setN1((+n1 / 100).toString());
    }
  };

  useEffect(() => {
    n2 ? setDisplay(n2) : setDisplay(n1);
  }, [n1, n2]);

  return (
    <div className="App">
      <div className="display">{display}</div>
      <div className="number">
        <NumberPanel n="7" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="8" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="9" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="4" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="5" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="6" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="1" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="2" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="3" onClickHandler={numberPanelClickHandler} />
        <NumberPanel className="zero" n="0" onClickHandler={numberPanelClickHandler} />
        <NumberPanel n="." onClickHandler={numberPanelClickHandler} />
      </div>
      <div className="operator">
        <OperatorPanel op="÷" onClickHandler={operatorPanelClickHanlder} />
        <OperatorPanel op="×" onClickHandler={operatorPanelClickHanlder} />
        <OperatorPanel op="-" onClickHandler={operatorPanelClickHanlder} />
        <OperatorPanel op="+" onClickHandler={operatorPanelClickHanlder} />
        <CommonPanel onClickHandler={equalPanelClickHanlder}>=</CommonPanel>
      </div>
      <div className="command">
        <CommonPanel onClickHandler={allClearPanelHandler}>AC</CommonPanel>
        <CommonPanel onClickHandler={inversePanelHanlder}>+/-</CommonPanel>
        <CommonPanel onClickHandler={percentPanelHandler}>%</CommonPanel>
      </div>
    </div>
  );
};
