import React, { useState, createContext, useContext, ReactNode } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { api } from "../services/api";
import { OPEN_CAGE_API_KEY } from "../services/keys";

interface LocationContext {
  dataCity: any;
  loading: boolean;
  handleLocation: () => Promise<void>;
  handleSubmit: (city: string) => Promise<void>;
}

interface GitHubProviderProps {
  children: ReactNode;
}

const LocationContext = createContext({} as LocationContext);

const LocationProvider = ({ children }: GitHubProviderProps) => {
  const [dataCity, setDataCity] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (city: string) => {
    try {
      setLoading(true);
      const { data } = await api.get(`json?key=${OPEN_CAGE_API_KEY}&q=${city}`);
      //!data.total_results
      if (!data.total_results) {
        throw new Error(`Error ao Carregar os dados`);
      }
      setLoading(false);
      setDataCity(data.results);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  const handleLocation = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLoading(false);
        Alert.alert(
          `Para pegar sua localizacao precisamos da autorizacao, ou vc pode digitar a cidade selecionada!`
        );
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      const { data } = await api.get(
        `/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`
      );

      if (!data) {
        setLoading(false);
        throw new Error(`Error ao Carregar os dados`);
      }
      setLoading(false);
      setDataCity(data.results);
    } catch (error) {
      setLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <LocationContext.Provider
      value={{ dataCity, loading, handleLocation, handleSubmit }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocaiton = () => useContext(LocationContext);

export { useLocaiton, LocationProvider };
