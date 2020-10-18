import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapMaker from "../img/pin/Local.png";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

function OrphanageMap() {
  interface Orphanage {
    id: number;
    nome: string;
    latitude: number;
    longitude: number;
  }

  useEffect(() => {
    api
      .get("orphanages")
      .then((response) => setorphanages(response.data))
      .catch((err) =>
        console.log("erro ao tentar conectar com o backend" + err)
      );
  }, []);

  const [orphanages, setorphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();

  function handleNavigationToOrphanageDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleNavigationToMapPosition() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.443956223689696,
          longitude: -46.53002031238607,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {orphanages.length > 0 &&
          orphanages.map((institution,index) => {
            return (
              <Marker
                key={`${institution.nome}_${index}`}
                icon={mapMaker}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: institution.latitude,
                  longitude: institution.longitude,
                }}
              >
                <Callout
                  onPress={() =>
                    handleNavigationToOrphanageDetails(institution.id)
                  }
                  tooltip={true}
                >
                  <View style={styles.callOutContainer}>
                    <Text style={styles.callOutText}>{institution.nome}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
      </MapView>
      <View style={styles.mapFooter}>
        <Text style={styles.footerText}>
          {orphanages.length} Orphanatos encontrados
        </Text>
        <TouchableOpacity
          style={styles.newOrphanageButton}
          onPress={handleNavigationToMapPosition}
        >
          <Feather name="plus" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callOutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff83",
    justifyContent: "center",
  },
  callOutText: {
    fontFamily: "Nunito_700Bold",
    color: "#15C3D6",
    fontSize: 14,
  },
  mapFooter: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },
  newOrphanageButton: {
    width: 60,
    height: 46,
    borderRadius: 20,
    backgroundColor: "#15C3D6",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrphanageMap;
