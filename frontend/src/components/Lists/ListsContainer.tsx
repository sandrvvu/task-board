import React, { FC, useEffect } from "react";
import TasksList from "./List";
import { useCustomDispatch, useCustomSelector } from "../../hooks/stateHooks";
import { fetchAllLists } from "../../store/Slices/listsThunks";

const ListsContainer: FC = () => {
  const dispatch = useCustomDispatch();
  const lists = useCustomSelector((state) => state.lists.items);
  const isLoading = useCustomSelector((state) => state.lists.status === "loading");

  useEffect(() => {
    dispatch(fetchAllLists());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-center xl:justify-between gap-x-1 md:gap-x-11 gap-y-20">
      {isLoading ? (
        <p className="text-gray-400 tracking-widest">Loading...</p>
      ) : lists.length === 0 ? (
        <p className="text-gray-400 tracking-widest">You haven't created any lists yet.</p>
      ) : (
        lists.map((list) => (
          <TasksList
            id={list.id}
            name={list.name}
            tasks={list.tasks}
            key={list.id}
          />
        ))
      )}
    </div>
  );
};

export default ListsContainer;
