import { useEffect, useState } from "react";
import "./App.css";
import { Panel } from "./Panel";
import { NumberType, NUMBER_TYPE } from "./types/NumberType";
import { OperatorType, OPERATOR_TYPE } from "./types/OperatorType";

const appendNumber = (sbj: string | undefined, obj: NumberType): string => {
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

export const App = () => {
  const [n1, setN1] = useState<string>("0");
  const [n2, setN2] = useState<string | undefined>();
  const [operator, setOperator] = useState<OperatorType | undefined>();
  const [display, setDisplay] = useState<string>("0");

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
        <Panel<NumberType> sym={NUMBER_TYPE.SEVEN} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.EIGHT} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.NINE} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.FOUR} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.FIVE} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.SIX} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.ONE} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.TWO} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType> sym={NUMBER_TYPE.THREE} onClickHandler={numberPanelClickHandler} />
        <Panel<NumberType>
          className="zero"
          sym={NUMBER_TYPE.ZERO}
          onClickHandler={numberPanelClickHandler}
        />
        <Panel<NumberType> sym={NUMBER_TYPE.DOT} onClickHandler={numberPanelClickHandler} />
      </div>
      <div className="operator">
        <Panel<OperatorType> sym="÷" onClickHandler={operatorPanelClickHanlder} />
        <Panel<OperatorType> sym="×" onClickHandler={operatorPanelClickHanlder} />
        <Panel<OperatorType> sym="-" onClickHandler={operatorPanelClickHanlder} />
        <Panel<OperatorType> sym="+" onClickHandler={operatorPanelClickHanlder} />
        <Panel<OperatorType> sym="=" onClickHandler={equalPanelClickHanlder} />
      </div>
      <div className="command">
        <Panel sym="AC" onClickHandler={allClearPanelHandler} />
        <Panel sym="+/-" onClickHandler={inversePanelHanlder} />
        <Panel sym="%" onClickHandler={percentPanelHandler} />
      </div>
    </div>
  );
};
