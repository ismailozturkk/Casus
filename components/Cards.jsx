import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import language from "../language/language.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../MyProvider";

const Cards = ({ name }) => {
  const [rotateValue, setRotateValue] = useState(180);
  const [pressCount, setPressCount] = useState(0);
  const [countUser, setCountUser] = useState(0.5);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const rotation = useSharedValue(180);
  const { setColor, time, users, spy, setColorStatusBar, value } =
    useContext(MyContext);

  const value1 = Number(value);
  const foundItemValue = language.Cards.filter((item) => item.value === value1);

  // Casus numaralarını rastgele üret
  const [spyNumbers, setSpyNumbers] = useState([]);

  useEffect(() => {
    // users + spy sayısı kadar kullanıcının arasından casus sayısı kadar rastgele sayı seç
    let randomNumbers = new Set();
    while (randomNumbers.size < spy) {
      let randomNumber = Math.floor(Math.random() * (users + spy)) + 1;
      randomNumbers.add(randomNumber);
    }
    // Rastgele casus numaraları benzersiz olarak set edildi
    setSpyNumbers([...randomNumbers]);
  }, [users, spy]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  const handlePress = () => {
    setRotateValue(rotateValue === 0 ? 180 : 0);
    rotation.value = withSpring(rotateValue === 0 ? 180 : 0, {
      damping: 20,
      stiffness: 100,
      mass: 1,
      easing: Easing.linear,
    });

    setPressCount((prev) => {
      setCountUser(countUser + 0.5);
      let press = (users + spy) * 2;
      const newCount = prev + 1;
      if (newCount >= press) {
        onTargetReached();
      }
      return newCount;
    });
  };

  const onTargetReached = () => {
    setTimeLeft(time * 60 * 1000); // Dakikaları milisaniyeye çeviriyoruz.
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 10; // Her milisaniyede bir eksiltiyoruz.
      });
    }, 10); // Her 1 milisaniyede bir tetikleniyor.

    setTimer(intervalId);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setColor(["rgb(69, 10, 10)", "rgb(153, 27, 27)", "rgb(255, 23, 68)"]);
      setColorStatusBar("rgb(69, 10, 10)");
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <View style={styles.container}>
      {timeLeft == null ? (
        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={[styles.containerTouch, animatedStyle]}>
            <LinearGradient
              colors={[
                "rgb(29, 78, 216)",
                "rgb(30, 64, 175)",
                "rgb(30, 58, 138)",
              ]}
              style={styles.background}
            >
              <View
                style={[
                  styles.leftTop,
                  spyNumbers.includes(countUser)
                    ? { borderColor: "rgb(255, 23, 68)" }
                    : { borderColor: "white" },
                ]}
              />
              <View
                style={[
                  styles.rightTop,
                  spyNumbers.includes(countUser)
                    ? { borderColor: "rgb(255, 23, 68)" }
                    : { borderColor: "white" },
                ]}
              />

              {rotateValue === 0 ? (
                <View style={styles.middle}>
                  {/* Casus olan kullanıcıya "Casus Sensin" göster */}
                  {spyNumbers.includes(countUser) ? (
                    <View style={styles.middle}>
                      <Image
                        source={require("../assets/images/spy2.png")}
                        style={{ width: 100, height: 100 }}
                      />
                      <Text style={styles.wordTextSpy}>
                        {foundItemValue[0].spy}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.wordNameText}>{name}</Text>
                  )}
                </View>
              ) : (
                <Image
                  source={require("../assets/images/eye.png")}
                  style={{ width: 150, height: 150 }}
                />
              )}

              <View
                style={[
                  styles.leftBottom,
                  spyNumbers.includes(countUser)
                    ? { borderColor: "red" }
                    : { borderColor: "white" },
                ]}
              />
              <View
                style={[
                  styles.rightBottom,
                  spyNumbers.includes(countUser)
                    ? { borderColor: "red" }
                    : { borderColor: "white" },
                ]}
              />
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <View>
          {timeLeft == 0 ? (
            <Text style={styles.wordText}>{foundItemValue[1].time}</Text>
          ) : (
            <View style={styles.time}>
              <Text style={styles.wordText}>{foundItemValue[2].remaining}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={styles.wordTextHours}>
                  {Math.floor(timeLeft / 60000)}
                </Text>
                <Text style={styles.wordTextSecond}>
                  :
                  {String(Math.floor((timeLeft % 60000) / 1000)).padStart(
                    2,
                    "0"
                  )}
                </Text>
                <Text style={styles.wordTextMillisecond}>
                  :{String(Math.floor((timeLeft % 1000) / 10)).padStart(2, "0")}
                </Text>
              </View>
              <View style={styles.plus}>
                <TouchableOpacity
                  onPress={() => setTimeLeft(timeLeft - 300000)}
                >
                  <Text style={styles.minusText}>
                    - 5 {foundItemValue[3].add}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTimeLeft(timeLeft + 300000)}
                >
                  <Text style={styles.plusText}>
                    + 5 {foundItemValue[3].add}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.minus}>
                <TouchableOpacity onPress={() => setTimeLeft(timeLeft + 60000)}>
                  <Text style={styles.plusText}>
                    + 1 {foundItemValue[3].add}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTimeLeft(timeLeft - 60000)}>
                  <Text style={styles.minusText}>
                    - 1 {foundItemValue[3].add}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      <View>
        <Text style={styles.wordText}>
          {foundItemValue[4].people}
          {users + spy}
        </Text>
        {countUser > users + spy ? (
          <Text style={styles.wordText}>
            {foundItemValue[5].spies}
            {spy}
          </Text>
        ) : Number.isInteger(countUser) ? (
          <Text style={styles.wordText}>
            {countUser}. {foundItemValue[6].user}
          </Text>
        ) : (
          <Text style={styles.wordText}>
            {countUser + 0.5}. {foundItemValue[6].user}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  containerTouch: {
    height: 260,
    width: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  time: { marginBottom: 20 },
  wordText: {
    color: "rgb(132, 255, 255)",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "300",
  },
  wordTextHours: {
    color: "rgb(132, 255, 255)",
    marginVertical: 0,
    textAlign: "",
    fontSize: 48,
    fontWeight: "700",
  },
  wordTextSecond: {
    color: "rgb(132, 255, 255)",
    marginVertical: 5,
    textAlign: "center",
    fontSize: 34,
    fontWeight: "400",
  },
  wordTextMillisecond: {
    color: "rgb(132, 255, 255)",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "300",
  },
  wordNameText: {
    color: "rgb(132, 255, 255)",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "500",
  },
  plus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    gap: 10,
  },
  minus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    gap: 10,
  },
  plusText: {
    width: 100,
    backgroundColor: "rgb(0, 230, 118)",
    textAlign: "center",
    color: "black",
    padding: 15,
    borderRadius: 15,
  },
  minusText: {
    width: 100,
    backgroundColor: "rgb(244, 67, 54)",
    textAlign: "center",
    color: "white",
    padding: 15,
    borderRadius: 15,
  },
  wordTextSpy: {
    color: "white",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "500",
  },
  background: {
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  leftTop: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderTopLeftRadius: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "white",
  },
  rightBottom: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    borderBottomRightRadius: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "white",
  },
  leftBottom: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 50,
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "white",
  },
  rightTop: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    borderTopRightRadius: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "white",
  },
  middle: { alignItems: "center", justifyContent: "center", padding: 15 },
  counterText: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
  },
});
