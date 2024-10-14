import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { MyContext } from "../MyProvider";
import { LinearGradient } from "expo-linear-gradient";

const Settings = () => {
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const { time, setTime, users, setUsers, spy, setSpy, setCategory, category } =
    useContext(MyContext);

  const Category = () => {
    return (
      <View style={styles.container}>
        <View style={styles.category}>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(10)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(10)) {
                setCategory(category.filter((item) => item !== 10)); // 10 varsa çıkar
              } else {
                setCategory([...category, 10]); // 10 yoksa ekle
              }
            }}
          >
            <View>
              <Image
                source={require("../assets/categoryImages/recognition.png")}
                style={styles.img}
              />
              <Text style={styles.categoryText}>Eşyalar</Text>
            </View>
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
                setCategory(category.filter((item) => item !== 1)); // 10 varsa çıkar
              } else {
                setCategory([...category, 1]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/paws.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Hayvanlar</Text>
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
                setCategory(category.filter((item) => item !== 2)); // 10 varsa çıkar
              } else {
                setCategory([...category, 2]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/travelling-vehicles-of-a-road.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Araçlar</Text>
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
                setCategory(category.filter((item) => item !== 3)); // 10 varsa çıkar
              } else {
                setCategory([...category, 3]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/technology.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Teknolojik Aletler</Text>
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
                setCategory(category.filter((item) => item !== 4)); // 10 varsa çıkar
              } else {
                setCategory([...category, 4]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/dinner.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Yemekler</Text>
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
                setCategory(category.filter((item) => item !== 5)); // 10 varsa çıkar
              } else {
                setCategory([...category, 5]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/balls-sports.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Spor Terimleri</Text>
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
                setCategory(category.filter((item) => item !== 6)); // 10 varsa çıkar
              } else {
                setCategory([...category, 6]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/cloudy-day.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Hava Durumları</Text>
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
                setCategory(category.filter((item) => item !== 7)); // 10 varsa çıkar
              } else {
                setCategory([...category, 7]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/employee.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Meslekler</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(8)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(8)) {
                setCategory(category.filter((item) => item !== 8)); // 10 varsa çıkar
              } else {
                setCategory([...category, 8]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/coronavirus.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Ülkeler</Text>
          </Pressable>
        </View>
        <View style={styles.category}>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(9)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(9)) {
                setCategory(category.filter((item) => item !== 9)); // 10 varsa çıkar
              } else {
                setCategory([...category, 9]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/geographic.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Coğrafik Terimler</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCategory,
              category.includes(0)
                ? { backgroundColor: "rgb(174, 213, 129)" }
                : { backgroundColor: "rgb(229, 115, 115)" },
            ]}
            onPress={() => {
              if (category.includes(0)) {
                setCategory(category.filter((item) => item !== 0)); // 10 varsa çıkar
              } else {
                setCategory([...category, 0]); // 10 yoksa ekle
              }
            }}
          >
            <Image
              source={require("../assets/categoryImages/beach.png")}
              style={styles.img}
            />
            <Text style={styles.categoryText}>Tatil Yerleri</Text>
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
          <View style={styles.buttonGroup}>
            <View>
              <Text style={styles.settingText}>Casus Sayısı: </Text>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setSpy(spy > 1 ? spy - 1 : 1)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>-</Text>
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
          <View style={styles.buttonGroup}>
            <Text style={styles.settingText}>Oyuncu Sayısı</Text>
            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setUsers(users > 2 ? users - 1 : 2)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>-</Text>
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
            <Text style={styles.settingText}>Süre (dk)</Text>
            <View style={styles.buttonGroup}>
              <Pressable
                style={styles.buttonSettingM}
                onPress={() => setTime(time > 1 ? time - 1 : 1)} // spy-- yerine setSpy(spy - 1)
              >
                <Text style={styles.categoryTextM}>-</Text>
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
            <Text style={styles.categoryTextInf}>
              Toplam Kişi sayısı: {spy + users}
            </Text>
            <Text style={styles.categoryTextInf}>
              Oyun süresi: {time} dakika
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
          <Text style={styles.categoryText}>Katagoriler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible2(true)}
        >
          <Image
            source={require("../assets/categoryImages/control.png")}
            style={styles.img}
          />
          <Text style={styles.categoryText}>Ayarlar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible1}
        onSwipeComplete={toggleModal1}
        onBackdropPress={() => setModalVisible1(false)}
        backdropOpacity={0.4}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <LinearGradient
          colors={["rgb(30, 64, 175)", "rgb(30, 58, 138)", "rgb(23, 37, 84)"]}
          style={styles.modalContainer}
        >
          <View style={styles.modalRol} />
          <Category />
        </LinearGradient>
      </Modal>
      <Modal
        isVisible={isModalVisible2}
        onSwipeComplete={toggleModal2}
        onBackdropPress={() => setModalVisible2(false)}
        backdropOpacity={0.4}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <LinearGradient
          colors={["rgb(30, 64, 175)", "rgb(30, 58, 138)", "rgb(23, 37, 84)"]}
          style={styles.modalContainer}
        >
          <View style={styles.modalRol} />
          <Setting />
        </LinearGradient>
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
  buttonGroup: {
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
    margin: 5,
  },
  buttonCategory: {
    width: 90,
    height: 90,
    borderRadius: 15,
    padding: 10,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  img: { width: 40, height: 40 },
  button: {
    width: 90,
    height: 90,
    borderRadius: 15,
    padding: 10,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0, 230, 118)",
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
  categoryText: { color: "black" },
  settingText: { color: "white" },
  settingTextNumber: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  textView: {
    width: 50,
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    //backgroundColor: "steelblue",
  },

  categoryTextM: {
    color: "balck",
    fontSize: 38,
    fontWeight: "400",
    textAlign: "center",
  },
  categoryTextP: {
    color: "balck",
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
  },
  categoryTextInf: {
    color: "rgb(14, 165, 233)",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    margin: 0,
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
    margin: 0,
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
});
