import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCustomDispatch, useCustomSelector } from "../../hooks/stateHooks";
import { createNewList, editListName } from "../../store/Slices/listsThunks";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must contain at least 2 character" })
    .max(20, { message: "Name must contain at most 20 character" }),
});

type ListFormProps = {
  actionType: "CREATE" | "EDIT";
  listId?: string;
};

const ListForm: FC<ListFormProps> = ({ actionType, listId }: ListFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useCustomDispatch();
  const previousListData = useCustomSelector((state) =>
    state.lists.items.find((l) => l.id === listId)
  );

  const successMessage = `${actionType === "CREATE" ? "Successfully created list" : "Successfully updated list"}`;

  const submitForm = (listName: {name: string}) => {
    try {
      if (actionType === "CREATE") {
        dispatch(createNewList(listName));
      } else {
        if (listId) dispatch(editListName({ listId, listName }));
      }
      toast.success(successMessage, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-fit sm:w-96  mx-auto p-6"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          id="name"
          defaultValue={actionType === "EDIT" ? previousListData?.name : ""}
          {...register("name")}
          type="text"
          className={`border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500`}
        />
        {errors.name && errors.name.message && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.name.message.toString()}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="shadow-md border-2 border-indigo-400 bg-indigo-400 rounded py-1 px-4 transition duration-300 ease-in-out hover:bg-transparent hover:text-indigo-500"
      >
        {actionType === "CREATE" ? "Create new list" : "Edit the list"}
      </button>
    </form>
  );
};

export default ListForm;
