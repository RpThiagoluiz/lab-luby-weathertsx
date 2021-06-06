import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export const PreviousSearches = () => (
  <TouchableOpacity style={styles.container} activeOpacity={0.4}>
    <View style={styles.content}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Rio de Janeiro</Text>
        <Text>R.J, Brazil</Text>
      </View>
    </View>
    <Feather name="arrow-right" size={24} color={colors.red} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  content: {
    borderLeftWidth: 3,
    borderColor: colors.red,
  },
  wrapper: {
    marginLeft: 8,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
