import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Course } from "../types/menu";
import { useMenu } from "../store/MenuContext";

type NavProp = NativeStackNavigationProp<RootStackParamList, "FilterMenu">;
type Filter = "ALL" | Course;

export default function FilterMenuScreen() {
    const navigation = useNavigation<NavProp>();
    const { menuItems } = useMenu();
    const [filter, setFilter]  = useState<Filter>("ALL");

    const filteredItems =
    filter === "ALL"
     ? menuItems
     : menuItems.filter((item) => item.course === filter);

     return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.back}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Filter Menu</Text>

            <View style={styles.row}>
                {(["ALL", "STARTERS", "MAINS", "DESERT"] as Filter[]).map((option) => (
                    <TouchableOpacity
                    key={option}
                    style={[
                        styles.filterBtn,
                        filter === option && styles.selected,
                    ]}
                    onPress={() => setFilter (option)}
                    >
                        <Text style={styles.filterText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {filteredItems.length === 0 ? (
                <Text style={styles.empty}> No items found.</Text>
            ) : (
                filteredItems.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.meta}>{item.course}</Text>
                        <Text style={styles.meta}>{item.description}</Text>
                        <Text style={styles.meta}>R{item.price.toFixed(2)}</Text>
                    </View>
                ))
            )}

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
    back: {
        color: "#3ba0f2",
        fontWeight: "700",
        marginBottom: 14,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    filterBtn: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    selected: {
        backgroundColor: "#dbefff",
        borderColor: "#3ba0f2",
    },
    filterText: {
        fontWeight: "600",
    },
    empty: {
        textAlign: "center",
        marginTop: 20,
        color: "#666",
    },
    card: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 8,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },
    meta: {
        fontSize: 14,
        marginBottom: 2,
    },

});
