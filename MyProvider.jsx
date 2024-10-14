import React, { createContext, useState } from "react";

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
  const [category, setCategory] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
