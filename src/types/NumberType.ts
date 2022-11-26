export const NUMBER_TYPE = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  ZERO: "0",
  DOT: ".",
} as const;

export type NumberType = typeof NUMBER_TYPE[keyof typeof NUMBER_TYPE];
