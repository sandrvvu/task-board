import React, { FC, ReactNode, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

type DropdownProps = {
  children: ReactNode;
  trigger: ReactNode;
};

type DropdownItemProps = {
  children: ReactNode;
  handleCLick?: () => void;
};

const Dropdown: FC<DropdownProps> = ({ children, trigger }: DropdownProps) => {
  const [show, setShow] = useState(false);
  const dropRef = useClickOutside(() => setShow(false));

  return (
    <div className="relative" ref={dropRef}>
      <div onClick={() => setShow((curr) => !curr)}>{trigger}</div>
      {show && (
        <ul className="min-w-max absolute -right-10 sm:-right-20 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-md border-2 z-20">
          {children}
        </ul>
      )}
    </div>
  );
};

export function DropdownItem({ children, handleCLick }: DropdownItemProps) {
  return (
    <li
      onClick={handleCLick}
      className="flex w-full gap-3 items-center text-sm font-normal px-2 py-1 text-gray-800 hover:bg-indigo-100 cursor-pointer"
    >
      {children}
    </li>
  );
}

export default Dropdown;
