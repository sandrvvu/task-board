import { createSlice } from "@reduxjs/toolkit/react";
import { fetchAllLists } from "./listsThunks";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type TaskItem = {
  id: string;
  title: string;
  priority: TaskPriority;
  description: string | null;
  dueDate: Date | string | null;
  taskList: ListItem;
};

export type ListItem = {
  id: string;
  name: string;
  tasks: TaskItem[];
};

type ListsState = {
  items: ListItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
};

const initialState: ListsState = {
  items: [],
  status: "idle",
  error: null,
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList(state, action) {
      state.items.push(action.payload.listData);
    },
    addTask(state, action) {
      const { taskList, taskData } = action.payload;
      const listIndex = state.items.findIndex((list) => list.id === taskList);
      if (listIndex !== -1) {
        state.items[listIndex].tasks.push(taskData);
      }
    },
    editList(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.listId) {
          return {
            ...item,
            name: action.payload.listName.name,
          };
        }
        return item;
      });
    },
    editTask(state, action) {
      state.items = state.items.map((list) => {
        return {
          ...list,
          tasks: list.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              return {
                ...task,
                ...action.payload.taskInfo,
              };
            }
            return task;
          }),
        };
      });
    },
    removeList(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.listId
      );
    },
    removeTask(state, action) {
      state.items = state.items.map((item) => {
        return {
          ...item,
          tasks: item.tasks.filter((task) => task.id !== action.payload.id),
        };
      });
    },
    moveTask(state, action) {
      const { listId, taskId, newListId } = action.payload;

      const taskToMove = state.items
        ?.find((list) => list.id === listId)
        ?.tasks.find((task) => task.id === taskId);

      if (!taskToMove) {
        return;
      }

      state.items = state.items.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
        return list;
      });

      state.items = state.items.map((list) => {
        if (list.id === newListId) {
          list.tasks.unshift(taskToMove);
        }
        return list;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  createList,
  addTask,
  editTask,
  editList,
  removeList,
  removeTask,
  moveTask,
} = listsSlice.actions;
