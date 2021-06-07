import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../styles/colors";

//Escopo pra outra funcao de stylo ter acesso
const { blue, blue_light } = colors;

export const WeatherInfo = ({ currentWeather }: any) => {
  //a desestruturacao do weather, foi q ele tem um array e dentro desse array tem 1 objt, com varios valores.
  // ele desestruturou o array passado o valor do que tem dentro para details e assim acessando cada propriedade dentro do obj
  const {
    main: { temp },
    weather: [details],
  } = currentWeather;

  const { icon, main, description } = details;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}º</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherDescription: {
    textTransform: "capitalize", //Primeira letra ficar maiuscula
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 40,
    color: blue,
  },
  textSecondary: {
    fontWeight: "500",
    fontSize: 20,
    color: blue_light,
    marginTop: 10,
  },
});
