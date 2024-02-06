import { ReactNode } from "react";
import "./index.less";

export type ItemProps = {
  title: ReactNode;
  content: ReactNode;
};

export const Item = ({ title, content }: ItemProps) => {
  return (
    <li className="iztro-palace-center-item">
      <label>{title}</label>
      <span>{content}</span>
    </li>
  );
};
