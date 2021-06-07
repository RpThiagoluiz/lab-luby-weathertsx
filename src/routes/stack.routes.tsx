import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../screens/Home";
import { Search } from "../screens/Search";
import { colors } from "../styles/colors";
import { DataCityRoutes } from "./tabs.routes";

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
    <stackRoutes.Screen name="Dados da Cidade" component={DataCityRoutes} />
    <stackRoutes.Screen name="Clima" component={DataCityRoutes} />
  </stackRoutes.Navigator>
);
