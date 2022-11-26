import { FC } from "react";

type Props = {
  className?: string;
  children: string;
  onClickHandler: () => void;
};

export const CommonPanel: FC<Props> = ({ className, children, onClickHandler }) => {
  return (
    <button className={className} onClick={() => onClickHandler()}>
      {children}
    </button>
  );
};
