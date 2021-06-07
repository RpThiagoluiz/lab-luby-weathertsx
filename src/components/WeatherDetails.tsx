import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { shape, blue } = colors;

export const WeatherDetails = ({ currentWeather, unitsSystem }: any) => {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;

  const windSpeed =
    unitsSystem === "metric"
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: shape,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5 name="temperature-low" size={25} color={blue} />
            <View style={styles.weatherDetailsItems}>
              <Text>Feels like :</Text>
              <Text style={styles.textSecondary}>{feels_like} °</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="water" size={30} color={blue} />
            <View style={styles.weatherDetailsItems}>
              <Text>Humidity :</Text>
              <Text style={styles.textSecondary}>{humidity} %</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: shape,
        }}
      >
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: shape,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={30}
              color={blue}
            />
            <View style={styles.weatherDetailsItems}>
              <Text>Wind Speed :</Text>
              <Text style={styles.textSecondary}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons name="speedometer" size={30} color={blue} />
            <View style={styles.weatherDetailsItems}>
              <Text>Pressure :</Text>
              <Text style={styles.textSecondary}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: colors.shape,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textSecondary: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: "700",
    margin: 7,
  },
});
