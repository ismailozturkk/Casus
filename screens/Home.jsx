import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import Settings from "./Settings";
import wordDataTr from "../jsons/tr.json";
import wordDataAr from "../jsons/ar.json";
import wordDataEn from "../jsons/en.json";
import wordDataDe from "../jsons/de.json";
import wordDataEs from "../jsons/es.json";
import wordDataFr from "../jsons/fr.json";
import wordDataZh from "../jsons/zh.json";
import wordDataRu from "../jsons/ru.json";
import language from "../language/language.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../MyProvider";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const {
    color,
    setColor,
    category,
    colorStatusBar,
    setColorStatusBar,
    value,
  } = useContext(MyContext);

  const value1 = Number(value);
  const foundItemValue = language.Home.filter((item) => item.value === value1);

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
    console.log(category);
    if (category != [] && category.length > 0) {
      let randomCategory = 7;
      do {
        randomCategory = Math.floor(Math.random() * 8);
      } while (!category.includes(randomCategory));
      let language;
      let data;
      let value2 = Number(value);
      switch (value2) {
        case 1:
          language = wordDataTr;
          break;
        case 2:
          language = wordDataZh;
          break;
        case 3:
          language = wordDataRu;
          break;
        case 4:
          language = wordDataFr;
          break;
        case 5:
          language = wordDataAr;
          break;
        case 6:
          language = wordDataDe;
          break;
        case 7:
          language = wordDataEs;
          break;
        default:
          language = wordDataEn;
          break;
      }

      switch (randomCategory) {
        case 0:
          data = language.items;
          break;
        case 1:
          data = language.animals;
          break;
        case 2:
          data = language.vehicles;
          break;
        case 3:
          data = language.famous_places;
          break;
        case 4:
          data = language.foods;
          break;
        case 5:
          data = language.sports_terms;
          break;
        case 6:
          data = language.professions;
          break;
        case 7:
          data = language.countries;
          break;
        default:
          data = language.items;
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
        text1: foundItemValue[3].toast,
      });
    }
  };
  //!const value1 = value ?? 0; // Eğer value undefined ise varsayılan değer olarak 0 atanır

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
      <LinearGradient colors={color} style={styles.containerLineer}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.textBack}>{foundItemValue[0].title}</Text>
            <Text style={styles.text}>{foundItemValue[0].title}</Text>
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
              style={[{ width: screenWidth * 0.8 }]}
            >
              <LinearGradient
                colors={[
                  "rgba(0, 0, 0, 0)",
                  "rgba(46, 213, 115, 0.5)",
                  "rgba(46, 213, 115, 1)",
                ]}
                style={styles.gradient}
              >
                <Text style={styles.buttonTextBi}>
                  {foundItemValue[2].name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.info, { width: screenWidth * 0.75 }]}>
            <Settings />
            <TouchableOpacity
              onPress={() => createName()}
              activeOpacity={0.8}
              style={[{ width: screenWidth * 0.8 }]}
            >
              <LinearGradient
                colors={[
                  "rgba(0, 0, 0, 0)",
                  "rgba(46, 213, 115, 0.5)",
                  "rgba(46, 213, 115, 1)",
                ]}
                style={styles.gradient}
              >
                <Text style={styles.buttonTextBa}>
                  {foundItemValue[1].name}
                </Text>
              </LinearGradient>
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
    height: 100,
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
    height: 70,
    color: "white",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "500",
  },
  textQ: {
    width: 50,
    height: 60,
    color: "rgb(178, 255, 89)",
    textAlign: "center",
    fontSize: 42,
    fontWeight: "700",
  },
  buttonTextBa: {
    color: "rgb(203, 255, 225)",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTextBi: {
    color: "rgb(203, 255, 225)",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 16,
    fontWeight: "500",
  },

  gradient: {
    width: "100%",
    height: 60,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
});
