import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,Linking
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather, FontAwesome } from "@expo/vector-icons";

import mapMarkerImg from "../img/pin/Local.png";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import api from "../services/api";

interface OrphanageDetails {
  id: number;
}


interface Orphanage {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  abaout: string;
  instructions: string;
  open_on_weekends: boolean;
  opening_hours: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function OrphanageDetails() {
  const [details, setdetails] = useState<Orphanage>();

  const route = useRoute();
  const params = route.params as OrphanageDetails;

  function HandleGoToGoogleMap(){
    Linking.openURL(
      `http://www.google.com/maps/place/${details?.latitude},${details?.longitude}`
    )
  }

  useEffect(() => {
    api
      .get(`orphanages/${params.id}`)
      .then((res) => setdetails(res.data))
      .catch((error) => console.log(error));
  }, [params.id]);

  if (!details) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {details.images.map((image) => {
            return (
              <Image
                key={image.url}
                style={styles.image}
                source={{
                  uri: image.url,
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{details.nome}</Text>
        <Text style={styles.description}>{details.abaout}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: -23.443956223689696,
              longitude: -46.53002031238607,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: details.latitude,
                longitude: details.longitude,
              }}
            />
          </MapView>

          <View style={styles.routesContainer}>
            <Text style={styles.routesText}>

              <TouchableOpacity onPress={HandleGoToGoogleMap}>
              <Text style={styles.routesText}>  Ver rotas no Google Maps </Text>
              </TouchableOpacity> 

            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{details.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              {details.opening_hours}
            </Text>
          </View>
          <View
            style={
              !details.open_on_weekends
                ? styles.scheduleItemRed
                : [styles.scheduleItem, styles.scheduleItemGreen]
            }
          >
            <Feather
              name="info"
              size={40}
              color={(!details.open_on_weekends && "#FF669D") || "#39CC83"}
            />
            <Text
              style={
                !details.open_on_weekends
                  ? styles.scheduleTextRed
                  : [styles.scheduleText, styles.scheduleTextGreen]
              }
            >
              {!details.open_on_weekends && "Não"} Atendemos fim de semana
            </Text>
          </View>
        </View>

        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get("window").width,
    height: 240,
    resizeMode: "cover",
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: "#4D6F80",
    fontSize: 30,
  },

  description: {
    color: "#5c8599",
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#B3DAE2",
    marginTop: 40,
    backgroundColor: "#E6F7FB",
  },

  mapStyle: {
    width: "100%",
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  routesText: {
    color: "#0089a5",
  },

  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#D3E2E6",
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: "row",
  },

  scheduleItem: {
    width: "48%",
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: "#E6F7FB",
    borderWidth: 1,
    borderColor: "#B3DAE2",
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: "#EDFFF6",
    borderWidth: 1,
    borderColor: "#A1E9C5",
    borderRadius: 20,
  },

  scheduleItemRed: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 3,
    width: "50%",
    backgroundColor: "#FCF0F4",
    borderWidth: 1,
    borderColor: "#FFBCD4",
    borderRadius: 20,
  },

  scheduleText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextRed: {
    textAlign: "center",
    color: "tomato",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: "#5C8599",
  },

  scheduleTextGreen: {
    color: "#37C77F",
  },

  contactButton: {
    backgroundColor: "#3CDC8C",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 16,
  },
});
