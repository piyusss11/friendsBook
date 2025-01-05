import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";
interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { login, logout } = userSLice.actions;
export default userSLice.reducer;
