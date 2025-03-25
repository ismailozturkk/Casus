import { StyleSheet, Text, View } from "react-native";
import Cards from "./components/Cards";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./screens/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyProvider, { MyContext } from "./MyProvider";
import { useContext, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export default function App() {
  useEffect(() => {
    // Asenkron işlemi içeren bir fonksiyon tanımla
    const setupDatabase = async () => {
      try {
        // Veritabanını aç
        const db = await SQLite.openDatabaseAsync("Data.db");

        // `Record` tablosunu oluştur
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Record (
            id INTEGER PRIMARY KEY NOT NULL, 
            language INTEGER, 
            categories TEXT
          );
        `);

        console.log("Record tablosu oluşturuldu veya zaten mevcut");

        // `Settings` tablosunu oluştur
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS Settings (
            id INTEGER PRIMARY KEY NOT NULL,
            spy INTEGER,
            players INTEGER,
            time INTEGER
          );
        `);
        console.log("Settings tablosu oluşturuldu veya zaten mevcut");
      } catch (error) {
        console.error("Veritabanı oluşturma hatası:", error);
      }
    };

    // Asenkron fonksiyonu çağır
    setupDatabase();
  }, []);

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
