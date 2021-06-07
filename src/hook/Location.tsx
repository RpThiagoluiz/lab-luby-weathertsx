import React, { useState, createContext, useContext, ReactNode } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { api } from "../services/api";
import { OPEN_CAGE_API_KEY } from "../services/keys";

interface LocationContext {
  dataCity: any;
  loading: boolean;
  recentsSearchs: dataCityData[];
  handleLocation: () => Promise<void>;
  handleSubmit: (city: string) => Promise<void>;
}

interface GitHubProviderProps {
  children: ReactNode;
}

export interface dataCityData {
  city: string;
  country: string;
  state: string;
  county: string;
  municipality: string;
  region: string;
  long: string;
  lat: string;
  state_code: string;
}

const LocationContext = createContext({} as LocationContext);

const LocationProvider = ({ children }: GitHubProviderProps) => {
  const [dataCity, setDataCity] = useState<dataCityData>();
  const [recentsSearchs, setRecentsSearchs] = useState<dataCityData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (city: string) => {
    try {
      setLoading(true);
      const { data } = await api.get(`json?key=${OPEN_CAGE_API_KEY}&q=${city}`);
      //!data.total_results
      if (!data.total_results) {
        throw new Error(`Error ao Carregar os dados`);
      }
      const dataSuccess = await data.results[0];

      let results: dataCityData = {
        city: dataSuccess.components.city,
        country: dataSuccess.components.country,
        state: dataSuccess.components.state,
        county: dataSuccess.components.county,
        municipality: dataSuccess.components.municipality,
        region: dataSuccess.components.region,
        long: `${dataSuccess.geometry.lng}`,
        lat: `${dataSuccess.geometry.lat}`,
        state_code: dataSuccess.components.state_code,
      };

      setDataCity(results);
      addCity(results);

      setLoading(false);
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

      const dataSuccess = await data.results[0];

      let results = {
        city: dataSuccess.components.city,
        country: dataSuccess.components.country,
        state: dataSuccess.components.state,
        county: dataSuccess.components.county,
        municipality: dataSuccess.components.municipality,
        region: dataSuccess.components.region,
        long: `${dataSuccess.geometry.lng}`,
        lat: `${dataSuccess.geometry.lat}`,
        state_code: dataSuccess.components.state_code,
      };
      setDataCity(results);
      addCity(results);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(error.message);
    }
  };

  const addCity = async (results: dataCityData) => {
    setLoading(true);
    let filteredSearchs = [...recentsSearchs];
    recentsSearchs.filter((e) => e.city !== results.city);
    filteredSearchs.unshift(results);
    filteredSearchs = filteredSearchs.slice(0, 3);

    setRecentsSearchs(filteredSearchs);
    setLoading(false);
  };

  return (
    <LocationContext.Provider
      value={{
        dataCity,
        recentsSearchs,
        loading,
        handleLocation,
        handleSubmit,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { useLocation, LocationProvider };
