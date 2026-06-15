import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import AddItemScreen from "../screens/AddItemScreen";
import FilterMenuScreen from "../screens/FilterMenuScreen";

export type RootStackParamList = {
    Home: undefined;
    AddItem: undefined;
    FilterMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator () {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddItem" component={AddItemScreen} />
                <Stack.Screen name="FilterMenu" component={FilterMenuScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}