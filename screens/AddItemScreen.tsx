import React, { useActionState, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView,} from "react-native";
import { useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Course, MenuItem } from "../types/menu";
import { useMenu } from "../store/MenuContext";

type NavProp = NativeStackNavigationProp<RootStackParamList, "AddItem">;

export default function AddItemScreen(){
    const navigation = useNavigation<NavProp>();
    const { addItem } = useMenu();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState<Course>("STARTERS");
    const [price, setPrice] = useState("");

    const handleAdd = () => {
        const n = name.trim();
        const d = description.trim();
        const p = price.trim();

        if (!n || !d || !p.match(/^\d+\.?\d*$/)) {
            Alert.alert("Invalid input", "Please complete all fields correctly!");
            return;
        }

        const item: MenuItem = {
            id: Date.now().toString(),
            name: n,
            description: d,
            course,
            price: parseFloat(p),
        };

        addItem(item);
        navigation.navigate("Home");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Add Menu Item</Text>

            <Text style={styles.label}>Dish name</Text>
            <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Garlic Naan"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the dish here..."
            multiline
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.row}>
                {(["STARTERS", "MAINS", "DESERT"]as Course[]).map((c) => (
                    <TouchableOpacity
                    key={c}
                    style={[styles.courseBtn, course === c && styles.selected]}
                    onPress={() => setCourse(c)}
                    >
                        <Text style={styles.courseText}>{c}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Price</Text>
            <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholder="0.00"
            />

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>BACK</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff"},
    content: { padding: 16},
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    label: { marginTop: 12, marginBottom: 6, fontWeight: "600"},
    
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 6,
    },
    multiline: {
        height: 90,
        textAlignVertical: "top",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    courseBtn: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 8,

    },
    selected: {
        backgroundColor: "#dbefff",
        borderColor:"#3ba0f2",
    },
    courseText: {
        fontWeight: "600",
    },
    button: {
        marginTop: 18,
        backgroundColor: "3ba0f2",
        padding: 14,
        alignItems: "center",
        borderRadius: 6,
    },
    backButton: {
        backgroundColor: "#666",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700"
    },

});