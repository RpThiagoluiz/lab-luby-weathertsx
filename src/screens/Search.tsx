import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Load } from "../components/Load";
import { Foundation } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { useLocation } from "../hook/Location";
import { PreviousCitySearches } from "../components/PreviousCitySearches";

export const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [enteredInput, setEnteredInput] = useState("");

  const { navigate } = useNavigation();
  const { recentsSearchs, loading, handleLocation, handleSubmit } =
    useLocation();

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

  const locationInputNav = async () => {
    if (!!enteredInput) {
      try {
        await handleSubmit(enteredInput);
        navigate("Dados da Cidade");
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      Alert.alert(`Preencha o nome da cidade primeiro ☹!`);
    }
  };

  const locationNav = async () => {
    try {
      handleLocation();
      navigate("Dados da Cidade");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleRemove = () => {
    console.log(`await`);
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
                onPress={locationInputNav}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={locationNav}
              >
                <Foundation name="target-two" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subTitle}>Previous Searches</Text>

              {recentsSearchs.length > 1 ? (
                <FlatList
                  data={recentsSearchs}
                  keyExtractor={(item) => item.city}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <PreviousCitySearches data={item} />
                  )}
                />
              ) : (
                <Text style={styles.empty}>Empty Searchs</Text>
              )}
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
  empty: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
