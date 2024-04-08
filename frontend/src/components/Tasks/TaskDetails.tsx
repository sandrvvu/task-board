import React, { FC, useState } from "react";
import { MdLabelImportantOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import moment from "moment";
import { SiInstatus } from "react-icons/si";
import { IoIosCalendar } from "react-icons/io";
import { useCustomSelector } from "../../hooks/stateHooks";
import Modal from "../UI/Modal";
import TaskForm from "../Forms/TaskForm";
import { TaskCardProps } from "./TaskCard";

const TaskDetails: FC<TaskCardProps> = ({
  id,
  title,
  priority,
  description,
  dueDate,
  listId,
}: TaskCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const list = useCustomSelector((state) =>
    state.lists.items.find((l) => l.id === listId)
  );

  return (
    <div className="w-96 flex flex-col" key={id}>
      <div className="p-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-1 shadow-md border-2 border-indigo-300 rounded py-1 px-2 transition duration-300 ease-in-out hover:bg-indigo-400 hover:text-white hover:border-indigo-500"
          >
            <MdEditNote />
            <p className="text-sm">Edit</p>
          </button>
        </div>
        <div className="w-4/5 my-7 grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <SiInstatus />
            <p className="text-sm">Status</p>
          </div>
          <p className="text-sm font-semibold">{list?.name}</p>
          {dueDate && (
            <>
              <div className="flex items-center gap-2 text-gray-600">
                <IoIosCalendar />
                <p className="text-sm">Due date</p>
              </div>
              <p className="text-sm font-semibold">
              {moment(dueDate, 'YYYY-MM-DD').format("DD/MM/YYYY")}
              </p>
            </>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <MdLabelImportantOutline />
            <p className="text-sm">Priority</p>
          </div>
          <p className="text-sm font-semibold">{priority}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Description</h2>
          {description ? (
            <p className="text-gray-800 text-sm">{description}</p>
          ) : (
            <p className="text-gray-400 text-sm">
              You don't describe this task
            </p>
          )}
        </div>
      </div>

      <Modal onClose={() => setShowModal(false)} visible={showModal}>
        <TaskForm taskId={id} />
      </Modal>
    </div>
  );
};

export default TaskDetails;
