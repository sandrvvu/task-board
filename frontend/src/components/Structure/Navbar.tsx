import React, { FC, useState } from "react";

import Modal from "../UI/Modal";
import { FaPlus } from "react-icons/fa6";
import ListForm from "../Forms/ListForm";

const Navbar: FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center sm:items-center my-7">
      <h1 className="text-3xl font-bold">My Task Board</h1>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center text-gray-800 font-medium justify-center gap-1 sm:gap-2 shadow-md border-2 border-indigo-400 bg-indigo-400 rounded py-1 px-2 sm:px-4 transition duration-300 ease-in-out hover:bg-transparent hover:text-indigo-500"
        >
          <FaPlus className="text-sm sm:text-base"/>
          <p className="text-lg">Create new list</p>
        </button>

        <Modal onClose={() => setShowModal(false)} visible={showModal}>
          <ListForm actionType="CREATE"/>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
