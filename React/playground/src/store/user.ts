import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Vunbo',
    age: 32,
  },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {setName} = userSlice.actions;
export default userSlice.reducer;