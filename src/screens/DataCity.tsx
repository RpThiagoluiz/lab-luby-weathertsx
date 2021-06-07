import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { Load } from "../components/Load";
import { useLocation } from "../hook/Location";

export const DataCity = () => {
  const { dataCity, loading } = useLocation();

  if (loading) return <Load />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{dataCity.city}</Text>
        <Text style={styles.subTitle}>
          {dataCity.state} {dataCity.state_code} - {dataCity.country}
        </Text>
        <Text>{dataCity.region}</Text>
        <Text>{dataCity.county}</Text>
        <Text>{dataCity.municipality}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {},
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
});
