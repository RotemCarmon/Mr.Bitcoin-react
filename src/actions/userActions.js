import UserService from "../services/UserService";

// READ
export function loadUser() {  
    return async (dispatch) => {
        try{
            const user = await UserService.getUser(); 
            dispatch({ type: "SET_CURR_USER", user });
            return user
        }catch {
            return
        }
      };
}

// CREATE 
export function addUser (user) {
    return async (dispatch) => {
        const newUser = await UserService.signup(user);
        dispatch({ type: "SAVE_USER", newUser})
    }
}