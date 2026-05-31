import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import CampusCard from "../components/CampusCard";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const focusNames = {
    "6a15d54c3b2366e70490d119": "Ondernemen en IT",
    "6a15d5421a5d31def991da98": "Mens en welzijn",
    "6a15d536a0d60e98c662cf13": "Kennis en onderzoek",
    "6a15d5294da93abc7cdb554f": "Werk en leren",
    "6a15d5191915144fddb8ffb7": "Basisverpleegkunde",
    "6a15d50ed3ec97189f9aa2ac": "Buitengewoon leren",
    "6a15d4fda4af80a02766f80e": "Integraal en creatief",
    "6a15d4cb387e3ec990f208ce": "Gezondheid en wetenschap",
}

const CampusScreen = () => {
    const navigation = useNavigation();
    const [campus, setCampus] = useState([]);
    const fontsLoaded = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    useEffect(() => {
        fetch('https://api.webflow.com/v2/collections/6a134b878a46ed51243b908d/items/live',
{
          headers: {
            'Authorization': 'Bearer f793e95b30f968796a1656b22d14563588d2c9c5f8bb59b9444c39d36f3e712e'
          }
        })
        .then(response => response.json())
        .then(data => {
          setCampus(data.items.map(item => ({
            id: item.id,
            name: item.fieldData.name,
            description: item.fieldData.inhoud,
            focus: focusNames[item.fieldData['focus-nieuw']] || "Unknown focus",
            image: { uri: item.fieldData.foto.url },
          })));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView>
                <Text style={styles.sectionTitle}>Campussen</Text>
                {campus.map((c) => (
                    <CampusCard
                        key={c.id}
                        title={c.name}
                        description={c.description}
                        image={c.image}
                        onPress={() => navigation.navigate('CampusDetail', {
                            name: c.name,
                            description: c.description,
                            focus: c.focus,
                            image: c.image,
                        })}
                    />
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#333',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    }
});
export default CampusScreen;

