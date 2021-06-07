import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Load } from "../components/Load";
import { useLocaiton } from "../hook/Location";

export const DataCity = () => {
  const { dataCity, loading } = useLocaiton();

  console.log(`DATA CITY SCREEN`);
  console.log(dataCity);

  if (loading) return <Load />;

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {dataCity.city}, {dataCity.state}, {dataCity.state_code}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
