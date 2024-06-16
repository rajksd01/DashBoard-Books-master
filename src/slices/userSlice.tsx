import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginDetails {
  userId: string;
  token: string;
}

const initialState: LoginDetails = {
  userId: "",
  token: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserDetails: (
      state,
      action: PayloadAction<{ userId: string; token: string }>
    ) => {
      (state.userId = action.payload.userId),
        (state.token = action.payload.token);
    },

    clearUserDetails: (state) => {
      (state.userId = ""), (state.token = "");
    },
  },
});

export default UserSlice.reducer;
export const { addUserDetails, clearUserDetails } = UserSlice.actions;
