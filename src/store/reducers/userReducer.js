const initialState = {
  users: [],
  user: null,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURR_USER":
      return { ...state, user: action.user };
    case "SAVE_USER":
      return {
        ...state,
        users: [...state.users, action.newUser]
      };

    default:
      return state;
  }
}
