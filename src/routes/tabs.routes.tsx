import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Weather } from "../screens/Weather";
import { colors } from "../styles/colors";

const AppTab = createBottomTabNavigator();

export const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={
        //Criar o estilo, ou passar diretamente pelo obj
        {
          activeTintColor: colors.green,
          inactiveTintColor: colors.heading,
          labelPosition: "beside-icon",
          style: {
            ...Platform.select({
              android: {
                paddingVertical: 10,
                height: 58,
              },
              ios: {
                paddingVertical: 20,
                height: 78,
              },
            }),
          },
        }
      }
    >
      <AppTab.Screen
        name="Weather"
        component={Weather}
        options={{
          //Essas infos size, color vem da onde
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="weather-partly-cloudy"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* <AppTab.Screen
        name="Search Custom"
        component={SearchApp}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="search-location" size={size} color={color} />
          ),
        }}
      /> */}
    </AppTab.Navigator>
  );
};
