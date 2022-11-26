export const OPERATOR_TYPE = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "×",
  DIVIDE: "÷",
  EXECUTE: "=",
} as const;

export type OperatorType = typeof OPERATOR_TYPE[keyof typeof OPERATOR_TYPE];
