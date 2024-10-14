import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import Settings from "./Settings";
import wordData from "../jsons/words.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../MyProvider";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const { color, setColor, category, colorStatusBar, setColorStatusBar } =
    useContext(MyContext);

  const toastConfig = {
    tomatoToast: ({ text1, props }) => (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "rgb(100, 255, 100)",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text1}
        </Text>
      </View>
    ),
    errorToast: ({ text1, props }) => (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "rgb(255, 100, 100)",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text1}
        </Text>
      </View>
    ),
  };

  createName = () => {
    if (category.length > 0) {
      let randomCategory = 10;

      do {
        randomCategory = Math.floor(Math.random() * 11);
      } while (!category.includes(randomCategory));

      let data;

      switch (randomCategory) {
        case 0:
          data = wordData.vacation_spots;
          break;
        case 1:
          data = wordData.animals;
          break;
        case 2:
          data = wordData.vehicles;
          break;
        case 3:
          data = wordData.technology_devices;
          break;
        case 4:
          data = wordData.foods;
          break;
        case 5:
          data = wordData.sports_terms;
          break;
        case 6:
          data = wordData.weather;
          break;
        case 7:
          data = wordData.professions;
          break;
        case 8:
          data = wordData.countries;
          break;
        case 9:
          data = wordData.geographical_terms;
          break;
        default:
          data = wordData.items;
          break;
      }

      const randomNumber = Math.floor(Math.random() * data.length); // 0-data.length-1 arasında sayı üretir
      const foundItem = data.find((item) => item.value === randomNumber); // 'item.value' ile eşleşen itemi bul
      const name = foundItem ? foundItem.name : "Item not found"; // Eğer bulunursa 'name' değerini al, yoksa hata mesajı
      setName(name); // 'name' state'ini güncelle
      setStart(true); // 'start' state'ini güncelle
    } else {
      Toast.show({
        type: "errorToast",
        text1: "En az bir tane kategor seçilmeli",
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <LinearGradient colors={color} style={styles.containerLineer}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.textBack}>Casus Kim</Text>
            <Text style={styles.text}>Casus Kim</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.textBackQ}>¿</Text>
            <Text style={styles.textQ}>¿</Text>
          </View>
        </View>
        {start ? (
          <View style={[styles.info, { width: screenWidth * 0.75 }]}>
            <Cards name={name} />
            <TouchableOpacity
              onPress={() => {
                setStart(false);
                setColor([
                  "rgb(23, 37, 84)",
                  "rgb(30, 58, 138)",
                  "rgb(37, 99, 235)",
                ]);
                setColorStatusBar("rgb(23, 37, 84)");
              }}
              style={[styles.buttonBi, { width: screenWidth * 0.75 }]}
            >
              <Text style={styles.buttonText}>Bitir</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.info, { width: screenWidth * 0.75 }]}>
            <Settings />
            <TouchableOpacity
              onPress={() => createName()}
              style={[styles.buttonBa, { width: screenWidth * 0.75 }]}
            >
              <Text style={styles.buttonText}>Başla</Text>
            </TouchableOpacity>
          </View>
        )}
        <StatusBar
          barStyle="light-content" // içerikteki ikon ve yazıların rengini ayarlamak için
          backgroundColor={colorStatusBar} // Android için arka plan rengini ayarlar
        />
      </LinearGradient>
      <Toast visibilityTime={3000} config={toastConfig} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLineer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    marginTop: 70,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBack: {
    position: "absolute",
    width: 400,
    height: 80,
    color: "rgba(0, 0, 0,0.5)",
    textAlign: "center",
    fontSize: 68,
    fontWeight: "bold",
  },
  textBackQ: {
    position: "absolute",
    width: 70,
    height: 90,
    color: "rgba(178, 255, 89,0.5)",
    textAlign: "center",
    fontSize: 62,
    fontWeight: "Bold",
  },
  text: {
    width: 300,
    height: 50,
    color: "white",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "500",
  },
  textQ: {
    width: 50,
    height: 50,
    color: "rgb(178, 255, 89)",
    textAlign: "center",
    fontSize: 42,
    fontWeight: "700",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonBa: {
    width: "100%",
    backgroundColor: "rgb(24, 255, 255)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
  },
  buttonBi: {
    width: "100%",
    backgroundColor: "rgb(0, 230, 118)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
