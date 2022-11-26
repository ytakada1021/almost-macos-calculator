import { ReactNode } from "react";

type Props<T> = {
  className?: string;
  sym: T;
  onClickHandler: (sym: T) => void;
};

export const Panel = <T extends ReactNode>({ className, sym, onClickHandler }: Props<T>) => {
  return (
    <button className={className} onClick={() => onClickHandler(sym)}>
      {sym}
    </button>
  );
};
