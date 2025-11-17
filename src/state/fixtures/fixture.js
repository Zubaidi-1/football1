import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const fixtureSlice = createSlice({
  name: "fixture",
  initialState,
  reducers: {
    setFixture: (state, action) => {
      state.value = action.payload;
    },

    filterFixtureByDate: (state, action) => {
      let { from, end } = action.payload;

      const startDate = new Date(from);
      const endDate = new Date(end);

      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);

      state.value = state.value.filter((fixture) => {
        const fixtureDate = new Date(fixture.date);
        return fixtureDate >= startDate && fixtureDate <= endDate;
      });
    },
  },
});

export const { setFixture, filterFixtureByDate } = fixtureSlice.actions;
export default fixtureSlice.reducer;
