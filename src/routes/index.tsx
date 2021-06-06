import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigatorRoutes } from "./stack.routes";

export const Routes = () => (
  <NavigationContainer>
    <StackNavigatorRoutes />
  </NavigationContainer>
);
