import { SAVE_NEW_TASK, DELETE_TASK } from "./types";

initialState = {
  tasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NEW_TASK:
      let newTask = action.payload;
      newTask.timestamp = Date.now();
      return {
        ...state,
        tasks: [newTask, ...state.tasks]
      };

    case DELETE_TASK:
      const index = state.tasks.map(t => t.timestamp).indexOf(action.payload);
      let newArr = [...state.tasks];
      newArr.splice(index, 1);
      return {
        ...state,
        tasks: newArr
      };

    default:
      return state;
  }
};
