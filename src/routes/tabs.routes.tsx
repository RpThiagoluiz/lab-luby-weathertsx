import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";
import { DataCity } from "../screens/DataCity";

import { colors } from "../styles/colors";
import { OldWeather } from "../screens/oldWeatherApp";

const AppTab = createBottomTabNavigator();

export const DataCityRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={
        //Criar o estilo, ou passar diretamente pelo obj
        {
          activeTintColor: colors.blue,
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
        name="Dados da Cidade"
        component={DataCity}
        options={{
          //Essas infos size, color vem da onde
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="city" size={size} color={color} />
          ),
        }}
      />

      <AppTab.Screen
        name="Clima"
        component={OldWeather}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="weather-partly-cloudy"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};
