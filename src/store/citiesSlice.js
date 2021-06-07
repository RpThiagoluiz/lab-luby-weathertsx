import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity(state, action) {
      const newCity = action.payload;

      const findCity = state.cities.find((city) => city.name === newCity.name);
      if (findCity) {
        return;
      }

      if (state.cities.length === 3) {
        state.cities.splice(0, 1);
        state.cities.push(newCity);
        return;
      } else {
        state.cities.push(newCity);
        return;
      }
    },
  },
});

export const CitiesActions = citiesSlice.actions;
export default citiesSlice;
