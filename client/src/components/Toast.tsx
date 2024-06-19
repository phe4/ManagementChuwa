import Portal from './Portal.tsx';
import { FC } from "react";

interface ToastProps {
  msg: string
}

const Toast: FC<ToastProps> = ({ msg }) => {
  return (
    <Portal>
      <p className="text-center px-5 py-2 text-sm font-normal bg-blue shadow-md text-white rounded absolute top-2 left-1/2 translate-x-m/5">{msg}</p>
    </Portal>
  );
};

export default Toast;