import React, { createContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

// Context oluştur
export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [color, setColor] = useState([
    "rgb(23, 37, 84)",
    "rgb(30, 58, 138)",
    "rgb(37, 99, 235)",
  ]);
  const [colorStatusBar, setColorStatusBar] = useState("rgb(23, 37, 84)");
  const [time, setTime] = useState(3);
  const [users, setUsers] = useState(2);
  const [spy, setSpy] = useState(1);
  const [category, setCategory] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [value, setValue] = useState(0);
  useEffect(() => {
    // Asenkron işlemi içeren bir fonksiyon tanımla
    const setupDatabase = async () => {
      try {
        // Veritabanını aç
        const db = await SQLite.openDatabaseAsync("Data.db");
        const firstSettings = await db.getFirstAsync("SELECT * FROM Settings");
        if (firstSettings) {
          setSpy(firstSettings.spy);
          setUsers(firstSettings.players);
          setTime(firstSettings.time);
        } else {
          console.error("firstSettings değil:");
        }
        const firstRecord = await db.getFirstAsync("SELECT * FROM Record");
        if (firstRecord) {
          console.log("0");

          setValue(firstRecord.language);
          if (typeof category == "string") {
            console.log("1");

            const cat = firstRecord.categories;
            const categoryArray = JSON.parse(cat);
            console.log(categoryArray);
            console.log(typeof cat);
            console.log(typeof categoryArray);
            setCategory(categoryArray);
          } else {
            console.log("2");

            console.log(typeof category);
            console.log(category);
            setCategory(firstRecord.categories);
          }
        } else {
          console.error("firstRecord değil:");
        }

        console.log("Settings tablosu oluşturuldu veya zaten mevcut");
      } catch (error) {
        console.error("Veritabanı oluşturma hatası:", error);
      }
    };

    // Asenkron fonksiyonu çağır
    setupDatabase();
  }, []);

  return (
    <MyContext.Provider
      value={{
        color,
        setColor,
        time,
        setTime,
        users,
        setUsers,
        spy,
        setSpy,
        category,
        setCategory,
        colorStatusBar,
        setColorStatusBar,
        value,
        setValue,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
