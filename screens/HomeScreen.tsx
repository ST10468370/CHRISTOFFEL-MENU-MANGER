import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button,TextInput, Alert, ScrollView, SafeAreaView, } from "react-native";
import { Course, MenuItem } from "../types/menu";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {

    //Form

    const [name, setName] = useState("");    // string
    const [description, setDescription] = useState("");    // string
    const [course, setCourse] = useState<Course>("STARTERS");
    const [price, setPrice] = useState("");    // string


 //Menu list

const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

const COURSE_OPTIONS: { value: Course; label: string }[] = [
    { value: "STARTERS", label: "Starters" },
    { value: "MAINS", label: "Mains" },
    { value: "DESERTS", label: "Deserts" },
];

const COURSE_TITLES: { key: Course; label: string }[] = [
    { key: "STARTERS", label: "Starters" },
    { key: "MAINS", label: "Mains" },
    { key: "DESERTS", label: "Deserts" },
];


const handleSubmit = () => {
    const nameTrimmed = name.trim();
    const descriptionTrimmed = description.trim();
    const priceTrimmed = price.trim();

    if(
        !nameTrimmed ||
        !descriptionTrimmed ||
        !priceTrimmed.match(/^\d+\.?\d*$/) // Check if price is a valid number
    ){
        Alert.alert("Invalid Input", "Please fill in all fields correctly.");
        return;
    }

    const newItem: MenuItem = {
        id: Date.now().toString(),
        name: nameTrimmed,
        course,
        description: descriptionTrimmed,
        price: parseFloat(priceTrimmed),
    };

    setMenuItems((prev: MenuItem[]) => [...prev, newItem]);

    // Empty form state
    setName("");
    setDescription("");
    setPrice("");

};

const handleDeleteitem = (id: string) => {
    Alert.alert(
        "Delete Item",
        "Are you sure you want to delete this item?",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setMenuItems((prev: MenuItem[]) => prev.filter((item) => item.id !== id));
                }
                
            }
        ]
    );
};

const groupedByCourse = COURSE_TITLES.map((c) => ({
    course: c.key,
    items: menuItems.filter((item: MenuItem) => item.course === c.key),
}));

const totalItems = menuItems.length;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar/>

            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollcontainer}>

            //Header*/
            <View style={styles.header}>
                <Text style={styles.title}>Christoffel's Menu</Text>
                <Text style={styles.totalCount}>Total Items: {totalItems}</Text>
            </View>

            <View style={styles.formSection}>
                <Text style={styles.formTitle}>Add New Menu Item</Text>

                <Text style={styles.label}>Dish Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g. Caesar Salad"
                />

                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="e.g. Fresh romaine lettuce with parmesan and croutons"
                    multiline
                />

                <Text style={styles.label}>Course:</Text>
                <View style={styles.courseButtons}>
                    {COURSE_OPTIONS.map((option) => (
                        <Button
                            key={option.value}
                            title={option.label}
                            onPress={() => setCourse(option.value)}
                            color={course === option.value ? "#007BFF" : "#CCCCCC"}
                        />
                    ))}
                </View>

                <Text style={styles.label}>Price (R)</Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="e.g. 49.99"
                    keyboardType="decimal-pad"
                />

                <View style={styles.formButtons}>
                    <Button title="Add Item" onPress={handleSubmit} />
                </View>
            </View>

            {/*Menu List*/}

            <View style={styles.menuContainer}>
                {groupedByCourse.map((group) => (
                    <View key={group.course} style={styles.courseSection}>
                        <Text style={styles.courseTitle}>
                            {COURSE_TITLES.find((c) => c.key === group.course)?.label || group.course}
                        </Text>
                        {group.items.length === 0 ? (
                            <Text style={styles.emptyText}>No items in this course.</Text>
                        ) : (
                            <FlatList
                                data={group.items}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.dishName}>{item.name}</Text>
                                            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
                                        </View>
                                        <Text style={styles.description}>{item.description}</Text>
                                        <View style={styles.deleteRow}>
                                            <Text
                                            style={styles.deleteText}
                                            onPress={() => handleDeleteitem(item.id)}
                                            >
                                                Delete
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                ))}
            </View>
            </ScrollView>
        
            </SafeAreaView>
            
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F5F5F5",
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",

        },
        title: {
            fontSize: 23,
            fontWeight: "bold",
        },
        totalCount: {
            fontSize: 16,
            color: "#666",
        },
        formSection: {
            backgroundColor: "#fff",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
        },
        formTitle: {
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 12,
        },
        label: {
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 4,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 8,
            marginBottom: 12,
            fontSize: 16,
        },
        textArea: {
            height: 80,
            textAlignVertical: "top",
        },
        courseButtons: {
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 12,
            gap: 8,
        },
        formButtons: {
            marginTop: 8,
        },
        menuContainer: {
            padding: 16,
        },
        courseSection: {
            marginBottom: 24,
        },
        courseTitle: {
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 8,
            color: "#444040",
        },
        emptyText: {
            fontStyle: "italic",
            color: "#525151",
            textAlign: "center",
            paddingVertical: 13,
        },
        itemCard: {
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 1,
        },
        itemHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
        },
        dishName: {
            fontSize: 16,
            fontWeight: "600",
        },
        price: {
            fontSize: 16,
            fontWeight: "600",
            color: "#09223d",
        },
        description: {
            fontSize: 14,
            color: "#3b3b3b",
        },
        deleteRow: {
            marginTop: 3,
            alignItems: "flex-end",
        },
        deleteText: {
            fontSize: 14,
            color: "#ff4d4d",
            textDecorationLine: "underline",
        },
        scrollcontainer: {
            paddingBottom: 16,
        },
    });

    

    


