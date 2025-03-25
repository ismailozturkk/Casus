import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import * as SQLite from "expo-sqlite";

export default function Datadeneme() {
  const Database = async () => {
    const db = await SQLite.openDatabaseAsync("Data.db");

    // `Record` tablosunda sadece bir satır olsun, ekle ya da güncelle

    // `Record` tablosunda bir satır var mı?
    const checkRecord = await db.getFirstAsync("SELECT * FROM Record LIMIT 1");

    //todo güncelleme
    const exampleCategories = [0, 1, 2, 3, 4, 5, 6, 7]; // Array olarak veri
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
        [0, 1] // Yeni değerleri buraya ekleyebilirsiniz
      );
      console.log("Record eklendi");
    }

    // `Settings` tablosunda sadece bir satır olsun, ekle ya da güncelle

    // `Settings` tablosunda bir satır var mı?
    const checkSettings = await db.getFirstAsync(
      "SELECT * FROM Settings LIMIT 1"
    );

    //todo güncelleme

    if (checkSettings) {
      // Eğer kayıt varsa, güncelle
      await db.runAsync(
        "UPDATE Settings SET spy = ?, players = ?, time = ? WHERE id = ?",
        [1, 2, 3, checkSettings.id] // Yeni değerleri buraya ekleyebilirsiniz
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

    // `Record` tablosundaki ilk kaydı al ve konsola yazdır
    const firstRecord = await db.getFirstAsync("SELECT * FROM Record");
    console.log("Record:", firstRecord);
    console.log("Record:", firstRecord.categories);

    //todo yazdırma

    // `Settings` tablosundaki ilk kaydı al ve konsola yazdır
    const firstSettings = await db.getFirstAsync("SELECT * FROM Settings");
    console.log("Settings:", firstSettings);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => Database()}
        style={{ width: 250, height: 100, backgroundColor: "aqua" }}
      >
        <Text>database</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
