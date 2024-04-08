import React, { FC, useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import { MdEditNote, MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Modal from "../UI/Modal";
import { useCustomDispatch } from "../../hooks/stateHooks";
import { deleteList } from "../../store/Slices/listsThunks";
import Dropdown, { DropdownItem } from "../UI/Dropdown";
import AddCardForm from "../Forms/TaskForm";
import ListForm from "../Forms/ListForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ListDropdownProps = {
  id: string;
};

const ListDropdown: FC<ListDropdownProps> = ({ id }: ListDropdownProps) => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const dispatch = useCustomDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteList(id));
      toast.success("Successfully deleted list", {
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
      <DropdownItem handleCLick={() => setShowEditListModal(true)}>
        <div className="flex justify-between items-center gap-1">
          <MdEditNote className="text-xl" />
          <p>Edit</p>
        </div>
      </DropdownItem>
      <DropdownItem handleCLick={() => setShowAddCardModal(true)}>
        <div className="flex justify-between items-center gap-1">
          <FaPlus className="text-base" />
          <p>Add new card</p>
        </div>
      </DropdownItem>
      <DropdownItem handleCLick={handleDelete}>
        <div className="flex justify-between items-center gap-1 text-red-700">
          <MdOutlineDelete className="text-base" />
          <p>Delete</p>
        </div>
      </DropdownItem>

      <Modal
        onClose={() => setShowAddCardModal(false)}
        visible={showAddCardModal}
      >
        <AddCardForm taskList={id} />
      </Modal>

      <Modal
        onClose={() => setShowEditListModal(false)}
        visible={showEditListModal}
      >
        <ListForm actionType="EDIT" listId={id} />
      </Modal>
    </Dropdown>
  );
};

export default ListDropdown;
