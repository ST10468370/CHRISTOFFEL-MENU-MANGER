import React from "react";
import { MenuProvider } from "./store/MenuContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  );
}