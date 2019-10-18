import { SAVE_NEW_TASK, DELETE_TASK } from "./types";

export const saveNewTask = task => {
  return {
    type: SAVE_NEW_TASK,
    payload: task
  };
};

export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    payload: id
  };
};
