import { StyleSheet, Text, View } from "react-native";
import Cards from "./components/Cards";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./screens/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyProvider, { MyContext } from "./MyProvider";
import { useContext } from "react";
export default function App() {
  return (
    <MyProvider>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Home />
        </GestureHandlerRootView>
      </SafeAreaView>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
