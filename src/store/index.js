import { configureStore } from "@reduxjs/toolkit";

import citiesSlice from "./citiesSlice";

const store = configureStore({
  reducer: {
    city: citiesSlice.reducer,
  },
});

export default store;
