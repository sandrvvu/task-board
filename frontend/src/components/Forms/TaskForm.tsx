import React, { FC } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCustomDispatch, useCustomSelector } from "../../hooks/stateHooks";
import {
  addNewTask,
  editTaskData,
  TaskInfo,
} from "../../store/Slices/tasksThunks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

const schema = z.object({
  title: z
    .string()
    .min(2, { message: "Name must contain at least 2 character" })
    .max(40, { message: "Name must contain at most 40 character" }),
  priority: z.nativeEnum(Priority, {
    errorMap: () => {
      return { message: "Please choose an option" };
    },
  }),
  dueDate: z.union([z.string(), z.date(), z.null()]).nullable().default(null),
  description: z.string().max(500).optional().nullable(),
});

type TaskFormProps = {
  taskId?: string;
  taskList?: string;
};

const TaskForm: FC<TaskFormProps> = ({ taskId, taskList }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useCustomDispatch();
  const previousCardData = useCustomSelector((state) =>
    state.lists.items
      .map((list) => list.tasks)
      .flat()
      .find((task) => task.id === taskId)
  );

  const successMessage = `${
    taskList ? "Successfully created task" : "Successfully updated task"
  }`;

  const onSubmit = (taskInfo: TaskInfo) => {
    try {
      if (taskId) {
        dispatch(editTaskData({ taskId, taskInfo }));
      } else {
        if (taskList) dispatch(addNewTask({ taskList, taskInfo }));
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

  const dueDateString = previousCardData?.dueDate
  ? moment.utc(previousCardData.dueDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
  : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto p-6">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title:
        </label>
        <input
          id="title"
          defaultValue={taskId ? previousCardData?.title : ""}
          {...register("title")}
          type="text"
          className={`border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md py-1 px-3 w-full focus:outline-none focus:border-indigo-500`}
        />
        {errors.title && errors.title.message && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.title.message.toString()}
          </p>
        )}
      </div>

      <div className="flex mb-4 flex-col gap-4 sm:flex-row sm:gap-0">
        <div className="mr-4">
          <label
            htmlFor="priority"
            className="text-gray-700 text-sm font-bold mb-2 mr-4"
          >
            Priority:
          </label>
          <select
            id="priority"
            defaultValue={taskId ? previousCardData?.priority : Priority.LOW}
            {...register("priority")}
            className="text-sm border-2 rounded px-2 py-1 bg-indigo-100 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="text-gray-700 text-sm font-bold mb-2 mr-4"
          >
            Due:
          </label>
          <input
            id="dueDate"
            defaultValue={dueDateString}
            {...register("dueDate")}
            type="date"
            className={`border ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            } rounded-md py-1 px-3 focus:outline-none focus:border-indigo-500`}
          />
          {errors.dueDate && errors.dueDate.message && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.dueDate.message.toString()}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className=" text-gray-700 text-sm font-bold mb-2 mr-4"
        >
          Description:
        </label>
        <textarea
          id="description"
          rows={7}
          defaultValue={taskId ? previousCardData?.description || "" : ""}
          {...register("description")}
          className={`border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md py-1 px-3 w-full focus:outline-none focus:border-indigo-500`}
        />
        {errors.description && errors.description.message && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.description.message.toString()}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="shadow-md border-2 border-indigo-400 bg-indigo-400 rounded py-1 px-4 transition duration-300 ease-in-out hover:bg-transparent hover:text-indigo-500"
      >
        {taskId ? "Edit the task" : "Add new card"}
      </button>
    </form>
  );
};

export default TaskForm;
