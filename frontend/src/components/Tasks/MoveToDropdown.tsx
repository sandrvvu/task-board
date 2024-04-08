import React, { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useCustomDispatch, useCustomSelector } from "../../hooks/stateHooks";
import Dropdown, { DropdownItem } from "../UI/Dropdown";
import { moveTaskToAnotherList } from "../../store/Slices/tasksThunks";

type MoveToDropdownProps = {
  taskId: string;
  listId: string;
};

const MoveToDropdown: FC<MoveToDropdownProps> = ({
  listId,
  taskId,
}: MoveToDropdownProps) => {
  const dispatch = useCustomDispatch();
  const lists = useCustomSelector((state) => state.lists.items);

  const handleMove = (newListId: string) => {
    dispatch(moveTaskToAnotherList({ listId, taskId, newListId }));
  };

  return (
    <Dropdown
      trigger={
        <button className="w-full bg-gray-200 flex items-center justify-between rounded px-2 py-1.5 transition duration-300 ease-in-out hover:bg-gray-300">
          <p className="text-xs text-gray-800">Move to</p>
          <IoIosArrowDown />
        </button>
      }
    >
      {lists
        .filter((list) => !list.tasks.some((task) => task.id === taskId))
        .map((list) => (
          <DropdownItem key={list.id} handleCLick={() => handleMove(list.id)}>
            <p>{list.name}</p>
          </DropdownItem>
        ))}
    </Dropdown>
  );
};

export default MoveToDropdown;
