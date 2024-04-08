import React, { FC, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { MdEditNote, MdOutlineDelete } from "react-icons/md";
import { useCustomDispatch } from "../../hooks/stateHooks";
import { deleteTask } from "../../store/Slices/tasksThunks";
import Dropdown, { DropdownItem } from "../UI/Dropdown";
import Modal from "../UI/Modal";
import TaskForm from "../Forms/TaskForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TaskDropdownProps = {
  id: string;
};

const TaskDropdown: FC<TaskDropdownProps> = ({ id }: TaskDropdownProps) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useCustomDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteTask(id));
      toast.success("Successfully deleted task", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error("Something went wrong!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };
  
  return (
    <Dropdown
      trigger={
        <button>
          <LuMoreVertical />
        </button>
      }
    >
      <DropdownItem handleCLick={() => setShowModal(true)}>
        <div className="flex justify-between items-center gap-1">
          <MdEditNote className="text-xl" />
          <p>Edit</p>
        </div>
      </DropdownItem>
      <DropdownItem handleCLick={handleDelete}>
        <div className="flex justify-between items-center gap-1 text-red-700">
          <MdOutlineDelete className="text-base" />
          <p>Delete</p>
        </div>
      </DropdownItem>

      <Modal onClose={() => setShowModal(false)} visible={showModal}>
        <TaskForm taskId={id} />
      </Modal>
    </Dropdown>
  );
};

export default TaskDropdown;
