import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 token:null
};

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload.token
    },
    UnSetUserToken: (state, action) => {
        state.token = action.payload.token
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken, UnSetUserToken } = authSlice.actions;

export default authSlice.reducer;
