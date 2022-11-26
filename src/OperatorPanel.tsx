import { FC } from "react";

export const OPERATOR_TYPE = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",
  EXECUTE: "=",
} as const;

export type OperatorType = typeof OPERATOR_TYPE[keyof typeof OPERATOR_TYPE];

type Props = {
  className?: string;
  op: OperatorType;
  onClickHandler: (op: OperatorType) => void;
};

export const OperatorPanel: FC<Props> = ({ className, op, onClickHandler }) => {
  return (
    <button className={className} onClick={() => onClickHandler(op)}>
      {op}
    </button>
  );
};
