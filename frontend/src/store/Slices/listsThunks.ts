import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createList, editList, removeList } from "./listsSlice";
import { API_BASE_URL } from "./config";

export const fetchAllLists = createAsyncThunk(
  "lists/fetchAllLists",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lists`);

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to fetch lists");
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch lists");
    }
  }
);

export const createNewList = createAsyncThunk(
  "lists/createNewList",
  async (listName: { name: string }, thunkApi) => {
    try {
      console.log("here");
      const response = await axios.post(`${API_BASE_URL}/lists`, listName);
      const listData = response.data;
      console.log(listData)
      thunkApi.dispatch(createList({listData}));

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to create a list");
      }

      return listData;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to create a list");
    }
  }
);

export const editListName = createAsyncThunk(
  "lists/editListName",
  async (
    { listId, listName }: { listId: string; listName: { name: string } },
    thunkApi
  ) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/lists/${listId}`,
        listName
      );

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to edit list");
      }

      thunkApi.dispatch(editList({ listId, listName }));

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to edit list");
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId: string, thunkApi) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/lists/${listId}`);

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("Failed to remove list");
      }
      thunkApi.dispatch(removeList({ listId }));

      return listId;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to remove list");
    }
  }
);
