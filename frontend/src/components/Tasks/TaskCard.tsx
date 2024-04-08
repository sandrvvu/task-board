import React, { FC, useState } from "react";
import { IoIosCalendar } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import TaskDetails from "./TaskDetails";
import moment from "moment";
import Modal from "../UI/Modal";
import { TaskPriority } from "../../store/Slices/listsSlice";
import TaskDropdownMenu from "./TaskDropdown";
import MoveToDropdown from "./MoveToDropdown";

export type TaskCardProps = {
  id: string;
  title: string;
  priority: TaskPriority;
  description: string | null;
  dueDate: Date | null | string;
  listId: string;
};

const TaskCard: FC<TaskCardProps> = ({
  id,
  title,
  priority,
  description,
  dueDate,
  listId,
}: TaskCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-fit border-2 border-indigo-300 rounded-md p-3 flex flex-col gap-2 shadow-md">
      <div className="flex justify-between items-center">
        <h1
          className="text-lg font-bold text-gray-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          {title}
        </h1>
        {!showModal && <TaskDropdownMenu id={id} />}
      </div>

      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        {description && (
          <p className="text-gray-500 leading-1 text-xs mr-6 mb-2">
            {description.slice(0, 100)}...
          </p>
        )}
        {dueDate && (
          <div className="flex gap-2 items-center justify-start mb-2">
            <IoIosCalendar className="text-xl" />
            <p className="text-xs text-gray-700 font-semibold">
            {moment(dueDate).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
        <div className="bg-indigo-300 rounded-lg w-fit flex justify-start items-center gap-1 px-2 py-1">
          <FaRegDotCircle className="text-xs" />
          <p className="text-xs text-gray-800 font-medium">{priority}</p>
        </div>
      </div>

      <MoveToDropdown taskId={id} listId={listId} />

      <Modal onClose={() => setShowModal(false)} visible={showModal}>
        <TaskDetails
          id={id}
          title={title}
          priority={priority}
          dueDate={dueDate}
          description={description}
          listId={listId}
        />
      </Modal>
    </div>
  );
};

export default TaskCard;
