import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLocaiton } from "../hook/Location";

export const Weather = () => {
  const { dataCity } = useLocaiton();

  //useEffect
  console.log(dataCity);

  return (
    <View style={styles.container}>
      <Text>Weather</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
