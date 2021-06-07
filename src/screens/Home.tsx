import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  //Platform
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import imgApp from "../assets/appIcon.png";
import { colors } from "../styles/colors";

export const Welcome = () => {
  const { navigate } = useNavigation();

  const handleStart = () => {
    navigate("Search");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Pesquise o Clima {"\n"}
          de qualquer cidade {"\n"}
          de forma facil
        </Text>
        <Image style={styles.image} source={imgApp} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Nao sofra mais com clima imprevisivel, aqui vc estara informado de
          tudo.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.3}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //No Android ta muito em cima
    // ...Platform.select({
    //   android: {
    //     marginTop: 20,
    //   },
    // }),
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around", //diferente do space-between, o around nao vai deixar colar nas bordas
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    lineHeight: 34,
  },
  image: {
    //React native trabalha com densidades de pixel.
    //width: 292,
    //height: 284,
    height: Dimensions.get("window").width * 0.7,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 15,
    height: 56,
    width: 56,
    //paddingHorizontal: 10,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
