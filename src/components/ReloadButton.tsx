import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons"; //NATIVO TBM
import { colors } from "../styles/colors";

const { blue } = colors;

interface ReloadButtonProps {
  load: () => Promise<void>;
}

export const ReloadButton = ({ load }: ReloadButtonProps) => {
  return (
    <View style={styles.reloadIcon}>
      <SimpleLineIcons onPress={load} name="refresh" size={24} color={blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  reloadIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
