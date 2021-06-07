import React from "react";
import { LocationProvider } from "./src/hook/Location";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <LocationProvider>
      <Routes />
    </LocationProvider>
  );
}
