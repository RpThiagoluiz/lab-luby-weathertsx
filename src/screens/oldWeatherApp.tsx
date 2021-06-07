import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { WEATHER_API_KEY } from "../services/keys";
import { Load } from "../components/Load";
import { ReloadButton } from "../components/ReloadButton";
import { UnitsPicker } from "../components/UnitsPicker";
import { WeatherInfo } from "../components/WeatherInfo";
import { WeatherDetails } from "../components/WeatherDetails";
import { colors } from "../styles/colors";
import { useLocation } from "../hook/Location";

export const OldWeather = () => {
  //const [loading, setLoading] = useState(true); // Ao inves de utilizar assim vc pode passar sem dando opcoes pra ele.
  const [errorMessage, setErrorMessage] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  const { dataCity } = useLocation();

  useEffect(() => {
    load();
  }, [unitsSystem]);

  const load = async () => {
    setCurrentWeather(null);

    try {
      const { lat: latitude, long: longitude } = dataCity;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      );

      if (!!data) {
        setCurrentWeather(data);
      } else {
        throw new Error(`Error ao carregar os dados`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadButton load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>Opa ocorreu um erro 😭</Text>
        <Text>{errorMessage}</Text>
      </View>
    );
  } else {
    return <Load />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
