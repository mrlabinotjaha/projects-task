import { actionTypes } from "../actionTypes";

const initialState = {
  projects: [{
    id: 1,
    name: "Project 1",
    description: "Description 1",
    owner: 25,
  },
],
  selectedProject: {},
};

export const projectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_PROJECT:
      const length = state.projects.length;
      const newPayload = { ...payload, id: length + 1 };
      return { ...state, projects: [...state.projects, newPayload] };

    case actionTypes.UPDATE_PROJECT:
      const newArray = [...state.projects];
      const projectIndex = newArray.findIndex(
        (value) => value.id === payload.id
      );
      newArray[projectIndex] = payload;
      return { ...state, projects: newArray };

    case actionTypes.SELECT_PROJECT:
      return { ...state, selectedProject: payload };

    default:
      return state;
  }
};
