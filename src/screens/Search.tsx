import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import { Load } from "../components/Load";
import { PreviousSearches } from "../components/PreviousSearches";
import { Foundation } from "@expo/vector-icons";
import { OPEN_CAGE_API_KEY } from "../services/keys";
import { colors } from "../styles/colors";
import { api } from "../services/api";
import axios from "axios";

export const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [enteredInput, setEnteredInput] = useState("");
  const [dataCity, setDataCity] = useState({});
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!enteredInput);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = (value: string) => {
    setIsFilled(!!value);
    setEnteredInput(value);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.get(
        `json?key=${OPEN_CAGE_API_KEY}&q=${enteredInput}`
      );

      if (!data.total_results) {
        throw new Error(`Error ao Carregar os dados`);
      }

      console.log(data);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          `Para pegar sua localizacao precisamos da autorizacao, ou vc pode digitar a cidade selecionada!`
        );
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      console.log(latitude);

      const { data } = await api.get(
        `/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
      );

      if (!data) {
        throw new Error(`Error ao Carregar os dados`);
      }
    } catch (error) {
      Alert.alert(error.message);
    }

    // try {
    //   const result = api.get(
    //     `q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
    //   );
    //   console.log(result);
    // } catch (error) {
    //   Alert.alert(error.message);
    // }
  };

  if (loading) return <Load />;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.title}>Type your location here:</Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="here"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleLocation}
              >
                <Foundation name="target-two" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subTitle}>Previous Searches</Text>
              <PreviousSearches />
              <PreviousSearches />
              <PreviousSearches />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  wrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    marginTop: 40,
  },
  form: {},
  title: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 15,
    color: colors.heading,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.shape,
    borderRadius: 10,
    padding: 8,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.red,
    borderRadius: 10,
    paddingVertical: 15,
    width: "40%",
    height: 50,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 28,
    lineHeight: 38,
    marginBottom: 10,
  },
});
