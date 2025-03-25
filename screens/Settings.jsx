import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
//import Modal from "react-native-modal";
import { MyContext } from "../MyProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import language from "../language/language.json";
import * as SQLite from "expo-sqlite";

const Settings = () => {
  const {
    value,
    setValue,
    time,
    setTime,
    users,
    setUsers,
    spy,
    setSpy,
    setCategory,
    category,
  } = useContext(MyContext);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const Database = async (category) => {
    const db = await SQLite.openDatabaseAsync("Data.db");
    // `Record` tablosunda sadece bir satır olsun, ekle ya da güncelle
    // `Record` tablosunda bir satır var mı?
    const checkRecord = await db.getFirstAsync("SELECT * FROM Record LIMIT 1");
    //todo güncelleme
    const exampleCategories = category; // Array olarak veri
    const categoriesString = JSON.stringify(exampleCategories);
    if (checkRecord) {
      // Eğer kayıt varsa, güncelle
      await db.runAsync(
        "UPDATE Record SET language = ?, categories = ? WHERE id = ?",
        [0, categoriesString, checkRecord.id] // Yeni değerleri buraya ekleyebilirsiniz
      );
      console.log("Record güncellendi");
    } else {
      // Eğer kayıt yoksa, ekle
      await db.runAsync(
        "INSERT INTO Record (language, categories) VALUES (?, ?)",
        [0, categoriesString] // Yeni değerleri buraya ekleyebilirsiniz
      );
      console.log("Record eklendi");
    }
  };
  const updateRecord = async (value) => {
    try {
      const db = await SQLite.openDatabaseAsync("Data.db");
      const checkRecord = await db.getFirstAsync(
        "SELECT * FROM Record LIMIT 1"
      );
      //todo güncelleme
      const exampleCategories = category;
      const categoriesString = JSON.stringify(exampleCategories);
      if (checkRecord) {
        await db.runAsync(
          "UPDATE Record SET language = ?, categories = ? WHERE id = ?",
          [value, categoriesString, checkRecord.id]
        );
        const firstRecord = await db.getFirstAsync("SELECT * FROM Record");
        console.log("Record:", firstRecord.language);
        console.log("Record:", firstRecord.categories);
        console.log("Record güncellendi");
      } else {
        const exampleCategories = category; // Array olarak veri
        const categoriesString = JSON.stringify(exampleCategories);
        await db.runAsync(
          "INSERT INTO Record (language, categories) VALUES (?, ?)",
          [0, categoriesString]
        );
        console.log("Record eklendi");
      }
    } catch (error) {
      console.error("Veritabanı oluşturma hatası:", error);
    }
  };

  const updateSetting = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("Data.db");
      const checkSettings = await db.getFirstAsync(
        "SELECT * FROM Settings LIMIT 1"
      );
      //todo güncelleme

      if (checkSettings) {
        // Eğer kayıt varsa, güncelle
        await db.runAsync(
          "UPDATE Settings SET spy = ?, players = ?, time = ? WHERE id = ?",
          [spy, users, time, checkSettings.id] // Yeni değerleri buraya ekleyebilirsiniz
        );
        console.log("Settings güncellendi");
      } else {
        // Eğer kayıt yoksa, ekle
        await db.runAsync(
          "INSERT INTO Settings (spy, players, time) VALUES (?, ?, ?)",
          [1, 2, 3] // Yeni değerleri buraya ekleyebilirsiniz
        );
        console.log("Settings eklendi");
      }
      //todo yazdırma

      // `Settings` tablosundaki ilk kaydı al ve konsola yazdır
      const firstSettings = await db.getFirstAsync("SELECT * FROM Settings");
      console.log("Settings:", firstSettings);
    } catch (error) {
      console.error("Veritabanı oluşturma hatası:", error);
    }
  };

  const data = [
    { label: "English", value: "0" },
    { label: "Türkçe", value: "1" },
    { label: "中文", value: "2" },
    { label: "Русский", value: "3" },
    { label: "Français", value: "4" },
    { label: "العربية", value: "5" },
    { label: "Deutsch", value: "6" },
    { label: "Español", value: "7" },
  ];
  function getLabelByValue(value) {
    // Verilen değeri string'e dönüştür
    const stringValue = String(value);
    // Dizide string karşılaştırması yap
    const item = data.find((entry) => entry.value === stringValue);
    return item ? item.label : "Value not found";
  }
  const translateLanguages = (language) => {
    switch (language) {
      case "1":
        return [
          { label: "İngilizce", value: "0" },
          { label: "Türkçe", value: "1" },
          { label: "Çince", value: "2" },
          { label: "Rusça", value: "3" },
          { label: "Fransızca", value: "4" },
          { label: "Arapça", value: "5" },
          { label: "Almanca", value: "6" },
          { label: "İspanyolca", value: "7" },
        ];
      case "0":
        return [
          { label: "English", value: "0" },
          { label: "Turkish", value: "1" },
          { label: "Chinese", value: "2" },
          { label: "Russian", value: "3" },
          { label: "French", value: "4" },
          { label: "Arabic", value: "5" },
          { label: "German", value: "6" },
          { label: "Spanish", value: "7" },
        ];
      case "2":
        return [
          { label: "英语", value: "0" },
          { label: "土耳其语", value: "1" },
          { label: "中文", value: "2" },
          { label: "俄语", value: "3" },
          { label: "法语", value: "4" },
          { label: "阿拉伯语", value: "5" },
          { label: "德语", value: "6" },
          { label: "西班牙语", value: "7" },
        ];
      case "3":
        return [
          { label: "English", value: "0" },
          { label: "Турецкий", value: "1" },
          { label: "Китайский", value: "2" },
          { label: "Русский", value: "3" },
          { label: "Французский", value: "4" },
          { label: "Арабский", value: "5" },
          { label: "Немецкий", value: "6" },
          { label: "Испанский", value: "7" },
        ];
      case "4":
        return [
          { label: "Anglais", value: "0" },
          { label: "Turc", value: "1" },
          { label: "Chinois", value: "2" },
          { label: "Russe", value: "3" },
          { label: "Français", value: "4" },
          { label: "Arabe", value: "5" },
          { label: "Allemand", value: "6" },
          { label: "Espagnol", value: "7" },
        ];
      case "5":
        return [
          { label: "الإنجليزية", value: "0" },
          { label: "التركية", value: "1" },
          { label: "الصينية", value: "2" },
          { label: "الروسية", value: "3" },
          { label: "الفرنسية", value: "4" },
          { label: "العربية", value: "5" },
          { label: "الألمانية", value: "6" },
          { label: "الإسبانية", value: "7" },
        ];
      case "6":
        return [
          { label: "Englisch", value: "0" },
          { label: "Türkisch", value: "1" },
          { label: "Chinesisch", value: "2" },
          { label: "Russisch", value: "3" },
          { label: "Französisch", value: "4" },
          { label: "Arabisch", value: "5" },
          { label: "Deutsch", value: "6" },
          { label: "Spanisch", value: "7" },
        ];
      case "7":
        return [
          { label: "Inglés", value: "0" },
          { label: "Turco", value: "1" },
          { label: "Chino", value: "2" },
          { label: "Ruso", value: "3" },
          { label: "Francés", value: "4" },
          { label: "Árabe", value: "5" },
          { label: "Alemán", value: "6" },
          { label: "Español", value: "7" },
        ];
      default:
        return data;
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 1000); // Modal açılmadan önce 100ms bekleyebilir
    return () => clearTimeout(timeout);
  }, [isModalVisible1]);

  const value1 = Number(value);
  const foundItemValue = language.Setting.filter(
    (item) => item.value === value1
  );

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const Category = () => {
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(0)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(0)) {
                console.log("0");
                if (typeof category == "string") {
                  console.log("1");
                  const categoryArray = JSON.parse(category);
                  console.log("category değeri:", category);
                  console.log("category türü:", typeof category);
                  Database(categoryArray.filter((item) => item !== 0));
                  setCategory([0, 1, 2, 3, 4, 5, 6, 7]);
                  console.log("category değeri:", categoryArray);
                  console.log("category türü:", typeof categoryArray);

                  console.log(Array.isArray(categoryArray));
                  setCategory(categoryArray.filter((item) => item !== 0));
                } else {
                  console.log("2");
                  Database(category.filter((item) => item !== 0));

                  setCategory(category.filter((item) => item !== 0));
                }
              } else {
                console.log("3");
                if (typeof category == "string") {
                  console.log("4");

                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 0]);
                  Database([...categoryArray, 0]);
                } else {
                  console.log("5");
                  setCategory([...category, 0]);
                  Database([...category, 0]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/recognition.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>{foundItemValue[7].items}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(1)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(1)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 1));
                } else {
                  setCategory(category.filter((item) => item !== 1));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 1]);
                } else {
                  setCategory([...category, 1]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/paws.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>{foundItemValue[8].animals}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(2)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(2)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 2));
                } else {
                  setCategory(category.filter((item) => item !== 2));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 2]);
                } else {
                  setCategory([...category, 2]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/travelling-vehicles-of-a-road.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>
              {foundItemValue[9].vehicles}
            </Text>
          </Pressable>
        </View>
        <View style={styles.category}>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(3)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(3)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 3));
                } else {
                  setCategory(category.filter((item) => item !== 3));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 3]);
                } else {
                  setCategory([...category, 3]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/beach.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>{foundItemValue[10].places}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(4)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(4)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 4));
                } else {
                  setCategory(category.filter((item) => item !== 4));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 4]);
                } else {
                  setCategory([...category, 4]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/dinner.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>{foundItemValue[11].foods}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(5)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(5)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 5));
                } else {
                  setCategory(category.filter((item) => item !== 5));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 5]);
                } else {
                  setCategory([...category, 5]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/balls-sports.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>{foundItemValue[12].sports}</Text>
          </Pressable>
        </View>
        <View style={styles.category}>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(6)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(6)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 6));
                } else {
                  setCategory(category.filter((item) => item !== 6));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 6]);
                } else {
                  setCategory([...category, 6]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/employee.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>
              {foundItemValue[13].profession}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(7)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(7)) {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory(categoryArray.filter((item) => item !== 7));
                } else {
                  setCategory(category.filter((item) => item !== 7));
                }
              } else {
                if (typeof category == "string") {
                  const categoryArray = JSON.parse(category);
                  setCategory([...categoryArray, 7]);
                } else {
                  setCategory([...category, 7]);
                }
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/coronavirus.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>
              {foundItemValue[14].country}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  //!! buradaki yeri ayarlara uygun şekilde belirle
  const Setting = () => {
    return (
      <View style={styles.container}>
        <View style={styles.categorySetting}>
          <View style={styles.buttonGroupL}>
            <View>
              <Text style={styles.settingText}>
                {foundItemValue[2].language}
              </Text>
            </View>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemContainerStyle={styles.itemContainerStyle}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.containerStyle}
                activeColor="rgb(0, 230, 118)"
                iconStyle={styles.iconStyle}
                data={translateLanguages(value)}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={getLabelByValue(value)}
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  console.log(item.value);
                  updateRecord(item.value);
                }}
              />
            </View>
          </View>
          <View style={styles.settingGroup}>
            <View>
              <Text style={styles.settingText}>{foundItemValue[3].spies}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setSpy(spy > 1 ? spy - 1 : 1)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>−</Text>
              </Pressable>
              <LinearGradient
                colors={[
                  "rgb(248, 113, 113)",
                  "rgb(30, 64, 175)",
                  "rgb(30, 64, 175)",
                  "rgb(74, 222, 128)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.textView}
              >
                <Text style={styles.settingTextNumber}>{spy}</Text>
              </LinearGradient>
              <Pressable
                style={styles.buttonSettingP}
                onPress={() => setSpy(spy + 1)} // spy++ yerine setSpy(spy + 1)
              >
                <Text style={styles.categoryTextP}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.settingGroup}>
            <Text style={styles.settingText}>{foundItemValue[4].player}</Text>
            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setUsers(users > 2 ? users - 1 : 2)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>−</Text>
              </Pressable>
              <LinearGradient
                colors={[
                  "rgb(248, 113, 113)",
                  "rgb(30, 64, 175)",
                  "rgb(30, 64, 175)",
                  "rgb(74, 222, 128)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.textView}
              >
                <Text style={styles.settingTextNumber}>{users}</Text>
              </LinearGradient>
              <Pressable
                style={styles.buttonSettingP}
                onPress={() => setUsers(users + 1)} // spy++ yerine setSpy(spy + 1)
              >
                <Text style={styles.categoryTextP}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <Text style={styles.settingText}>{foundItemValue[5].time}</Text>
            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setTime(time > 1 ? time - 1 : 1)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>−</Text>
              </Pressable>
              <LinearGradient
                colors={[
                  "rgb(248, 113, 113)",
                  "rgb(30, 64, 175)",
                  "rgb(30, 64, 175)",
                  "rgb(74, 222, 128)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.textView}
              >
                <Text style={styles.settingTextNumber}>{time}</Text>
              </LinearGradient>
              <Pressable
                style={styles.buttonSettingP}
                onPress={() => setTime(time + 1)} // spy++ yerine setSpy(spy + 1)
              >
                <Text style={styles.categoryTextP}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.Inf}>
            <Text style={styles.categoryTextInfUser}>
              {foundItemValue[6].people}
              {spy + users}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible1(true)}
        >
          <Image
            source={require("../assets/categoryImages/menu.png")}
            style={styles.img}
          />
          <Text style={styles.categoryText}>
            {foundItemValue[0].categories}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible2(true)}
        >
          <Image
            source={require("../assets/categoryImages/control.png")}
            style={styles.img}
          />
          <Text style={styles.categoryText}>{foundItemValue[1].settings}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={isModalVisible1} // isVisible yerine visible kullanılıyor
        onRequestClose={toggleModal1} // onSwipeComplete yerine onRequestClose kullanılıyor
        transparent={true} // Arka planı şeffaf yapmak için
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "tranparent",
          }}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0,0)",
              "rgba(0, 0, 0,0.3)",
              "rgba(0, 0, 0,0.6)",
              "rgba(0, 0, 0,0.7)",
              "rgba(0, 0, 0,0.7)",
            ]}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              width: "100%",
            }}
            onPress={() => setModalVisible1(false)}
          />
          <LinearGradient
            colors={["rgb(30, 64, 175)", "rgb(30, 58, 138)", "rgb(23, 37, 84)"]}
            style={styles.modalContainer}
          >
            <View style={styles.modalRol} />
            <Category />
          </LinearGradient>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isModalVisible2} // isVisible yerine visible kullanılıyor
        onRequestClose={toggleModal2} // onSwipeComplete yerine onRequestClose kullanılıyor
        transparent={true} // Arka planı şeffaf yapmak için
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "tranparent",
          }}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0,0)",
              "rgba(0, 0, 0,0.3)",
              "rgba(0, 0, 0,0.6)",
              "rgba(0, 0, 0,0.7)",
              "rgba(0, 0, 0,0.7)",
            ]}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              width: "100%",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              width: "100%",
            }}
            onPress={() => setModalVisible2(false)}
          />
          <LinearGradient
            colors={["rgb(30, 64, 175)", "rgb(30, 58, 138)", "rgb(23, 37, 84)"]}
            style={styles.modalContainer}
          >
            <View style={styles.modalRol} />
            <Setting />
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  settingGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingGroupL: {},
  buttonGroupL: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    flexDirection: "row",
    gap: 15,
    margin: 10,
  },
  categorySetting: {
    gap: 20,
    padding: 20,
  },
  buttonCategory: {
    width: 100,
    height: 100,
    borderRadius: 15,
    padding: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  img: { width: 50, height: 50 },
  button: {
    width: 150,
    height: 120,
    borderRadius: 15,
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 255, 120)",
  },
  buttonSettingAL: {
    width: "40%",
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(144, 164, 174)",
  },
  buttonSettingCL: {
    width: "40%",
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(144, 164, 174)",
  },
  buttonSettingM: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(248, 113, 113)",
  },
  buttonSettingP: {
    width: 40,
    height: 40,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(74, 222, 128)",
  },
  categoryText: { color: "black", textAlign: "center" },
  settingText: { color: "white" },
  settingTextNumber: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  textView: {
    width: 70,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    //backgroundColor: "steelblue",
  },

  categoryTextM: {
    color: "balck",
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
  },
  categoryTextP: {
    color: "balck",
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
  },

  categoryTextInfUser: {
    color: "rgb(14, 165, 233)",
    width: "90%",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  Inf: {
    flexDirection: "row",
    marginVertical: 15,
    gap: 20,
    justifyContent: "space-between",
  },
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },

  modalContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    maxHeight: 800,
    minHeight: 400,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalRol: {
    backgroundColor: "rgb(148, 163, 184)",
    position: "absolute",
    top: 0,
    borderRadius: 25,
    margin: 10,
    height: 4,
    width: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdown: {
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  selectedTextStyle: {
    color: "white",
    height: 20,
    textAlign: "center",
    fontSize: 16,
  },
  itemContainerStyle: {
    height: 35,
    backgroundColor: "rgb(148, 163, 184)",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgba(148, 163, 184,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextStyle: {
    height: 20,
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  containerStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
