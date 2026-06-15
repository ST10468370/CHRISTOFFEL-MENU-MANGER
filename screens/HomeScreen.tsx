import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useMenu } from "../store/MenuContext";
import { MenuItem } from "../types/menu";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavProp>();
    const { menuItems } = useMenu();

    const starters = menuItems.filter((i: MenuItem) => i.course === "STARTERS");
    const mains = menuItems.filter((i: MenuItem) => i.course === "MAINS");
    const desert = menuItems.filter((i: MenuItem) => i.course === "DESERTS");

    const totalPrice = menuItems.reduce(
        (sum: number, item: MenuItem) => sum + item.price,
        0
    );

    const averagePrice = menuItems.length ? totalPrice / menuItems.length : 0;

    const formatTotal = (items: MenuItem[]) =>
        items.reduce((sum: number, item: MenuItem) => sum + item.price, 0).toFixed(2);

    return (
        <ScrollView style ={styles.container} contentContainerStyle= {styles.content}>
            <Text style={styles.home}>Home</Text>
            <Text style={styles.title}>Christoffel's Menu</Text>

            <View style={styles.summary}>
                <Text>Total items: {menuItems.length}</Text>
                <Text>Average price: R{averagePrice.toFixed(2)}</Text>
                <Text>Starters: R{formatTotal(starters)}</Text>
                <Text>Mains: R{formatTotal(mains)}</Text>
                <Text>Deserts: R{formatTotal(desert)}</Text>

            </View>

            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddItem")}>
                <Text style={styles.buttonText}>ADD MENU iTEM</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={()=> navigation.navigate("FilterMenu")}>

                <Text style={styles.buttonText}>FILTER MENU</Text>
            </TouchableOpacity>

            {menuItems.map((item: MenuItem)=>(
                <View key={item.id} style={styles.card}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.course}</Text>
                    <Text style={styles.itemText}>{item.description}</Text>
                    <Text style={styles.itemText}>R{item.price.toFixed(2)}</Text>
                </View>
            ))}

        </ScrollView>
       
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 16,
    },
    home: {
        marginBottom: 18,
        fontSize: 16,
        color: "#111",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    summary:{
        marginBottom: 24,
        gap: 4,
    },
    button: {
        backgroundColor: "#3ba0f2",
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 12,
    },
    buttonText:{
        color: "#fff",
        fontWeight: "700",
    },
    card:{
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
    },
    itemName: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 4,
    },
    itemText: {
        fontSize: 14,
        marginBottom: 2,
    },

});