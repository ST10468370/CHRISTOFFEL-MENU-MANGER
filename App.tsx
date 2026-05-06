import React from "react";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <HomeScreen />
    </SafeAreaView>
  );
}