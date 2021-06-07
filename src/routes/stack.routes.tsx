import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../screens/Home";
import { Search } from "../screens/Search";
import { Weather } from "../screens/Weather";
import { colors } from "../styles/colors";

const stackRoutes = createStackNavigator();

export const StackNavigatorRoutes = () => (
  <stackRoutes.Navigator
    //headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen name="Search" component={Search} />
    <stackRoutes.Screen name="Weather" component={Weather} />
  </stackRoutes.Navigator>
);
