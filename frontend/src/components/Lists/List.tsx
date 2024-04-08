import React, { FC, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import TaskCard from "../Tasks/TaskCard";
import Modal from "../UI/Modal";
import TaskForm from "../Forms/TaskForm";
import { ListItem } from "../../store/Slices/listsSlice";
import ListDropdownMenu from "./ListDropdown";

const List: FC<ListItem> = ({ id, name, tasks }: ListItem) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-72 flex flex-col gap-4 bg-slate-50 p-4 rounded shadow-lg">
      <div className="flex justify-between items-center text-gray-800 text-lg font-semibold border-t-2 border-b-2 border-indigo-300 py-1 px-1">
        <h1>{name}</h1>
        <div className="flex items-center gap-4">
          <p>{tasks.length}</p>
          {!showModal && <ListDropdownMenu id={id} />}
        </div>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 text-gray-800  font-medium border-dotted border-2 border-indigo-300 rounded py-1 transition duration-300 ease-in-out hover:bg-indigo-400 hover:text-white hover:border-indigo-500"
      >
        <FaPlus />
        <p className="text-lg">Add new card</p>
      </button>
      <Modal onClose={() => setShowModal(false)} visible={showModal}>
        <TaskForm taskList={id} />
      </Modal>
      {tasks.map((task) => (
        <TaskCard
          id={task.id}
          title={task.title}
          priority={task.priority}
          description={task.description}
          dueDate={task.dueDate}
          listId={id}
          key={task.id}
        />
      ))}
    </div>
  );
};

export default List;
