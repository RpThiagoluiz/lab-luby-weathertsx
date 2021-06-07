import React from "react";
import { Animated, StyleSheet, Text, View, Alert } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { useLocation } from "../hook/Location";
import { useNavigation } from "@react-navigation/native";

interface PreviousSearchesProps extends RectButtonProps {
  //Somente pegando os dados q ele quer.
  data: {
    city: string;
    state_code: string;
    country: string;
    long: string;
    lat: string;
  };
  // handleRemove: () => void;
}

export const PreviousCitySearches = ({
  data,
  // handleRemove,
  ...rest
}: PreviousSearchesProps) => {
  const { handleSubmit, removeCity } = useLocation();
  const { navigate } = useNavigation();

  const locationNav = async () => {
    try {
      handleSubmit(data.city);
      navigate("Dados da Cidade");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={() => removeCity(data.city)}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest} onPress={locationNav}>
        <View style={styles.content}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{data.city}</Text>
            <Text>
              {data.state_code}, {data.country}
            </Text>
          </View>
        </View>

        <Feather name="arrow-right" size={24} color={colors.red} />
      </RectButton>
    </Swipeable>
  );
};

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
  buttonRemove: {
    width: 80,
    height: 50,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 20,
    paddingLeft: 15,
  },
});
