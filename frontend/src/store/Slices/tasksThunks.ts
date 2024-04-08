import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TaskItem,
  removeTask,
  addTask,
  moveTask,
  editTask,
} from "./listsSlice";
import axios from "axios";
import { API_BASE_URL } from "./config";

// export const fetchTaskById = createAsyncThunk(
//   "tasks/fetchTaskById",
//   async (taskId: string, thunkApi) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);

//       if (response.status !== 200) {
//         return thunkApi.rejectWithValue("Failed to edit task");
//       }
//       ///thunkApi.dispatch();

//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue("Failed to fetch the task");
//     }
//   }
// );

export type TaskInfo = Omit<Omit<TaskItem, "id">, "taskList">;

export const addNewTask = createAsyncThunk(
  "tasks/addTask",
  async (
    { taskList, taskInfo }: { taskList: string; taskInfo: TaskInfo },
    thunkApi
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/lists/${taskList}/tasks`,
        taskInfo
      );
      const taskData = response.data;

      thunkApi.dispatch(addTask({ taskList, taskData }));

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to add task");
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to add task");
    }
  }
);

export const editTaskData = createAsyncThunk(
  "tasks/editTask",
  async (
    { taskId, taskInfo }: { taskId: string; taskInfo: TaskInfo },
    thunkApi
  ) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        taskInfo
      );
      const serializableTaskInfo = {
        ...taskInfo,
        dueDate: taskInfo.dueDate instanceof Date 
          ? taskInfo.dueDate.toISOString() 
          : taskInfo.dueDate
      };
      
      thunkApi.dispatch(editTask({ taskId, taskInfo: serializableTaskInfo }));
      
      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to edit task");
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to edit task");
    }
  }
);

export const moveTaskToAnotherList = createAsyncThunk(
  "tasks/moveTaskToAnotherList",
  async (
    {
      listId,
      taskId,
      newListId,
    }: { listId: string; taskId: string; newListId: string },
    thunkApi
  ) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}/move/${newListId}`
      );

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to move task");
      }

      thunkApi.dispatch(moveTask({ listId, taskId, newListId }));

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to move task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, thunkApi) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to remove task");
      }
      thunkApi.dispatch(removeTask({ id: taskId }));
      return taskId;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to remove task");
    }
  }
);
