import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setLeagues: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setLeagues } = leaguesSlice.actions;
export default leaguesSlice.reducer;
