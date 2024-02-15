import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null
  },
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.token = payload.token
    }
  },
})

export const { login } = userSlice.actions;

export default userSlice.reducer;