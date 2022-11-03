import classNames from "classnames";

export interface TabProps {
  children: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Tab({ children, isActive, onClick }: TabProps) {
  return (
    <button
      className={classNames({
        btn: true,
        "btn-active": isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
