import { actionTypes } from "../actionTypes";

const initialState = {
  users: [
    {
      id: 25,
      name: "User 1",
      email: "user@gmail.com"
    },
  ],
  emailExist: false,
};

export const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_USER:
      if (emailExist(state.users, payload.email)) {
        return { ...state, emailExist: true };
      }

      const length = state.users.length;
      const newPayload = { ...payload, id: length + 1 };
      return { ...state, users: [...state.users, newPayload] };
    default:
      return state;
  }
};

const emailExist = (users, email) => {
  return !!users.find((usr) => usr.email === email);
};
