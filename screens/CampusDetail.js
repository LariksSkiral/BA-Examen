import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, useWindowDimensions } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import RenderHtml from 'react-native-render-html';

const CampusDetail = ({ route }) => {
    const { name, description, focus, image } = route.params;
    const { width } = useWindowDimensions();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
    });

    if (!fontsLoaded) return null;

    const tagsStyles = {
        body: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 15,
            color: '#555',
            lineHeight: 26,
        },
        p: {
            marginBottom: 12,
        },
        h1: { fontFamily: 'Poppins_700Bold', color: '#000', fontSize: 24 },
        h2: { fontFamily: 'Poppins_700Bold', color: '#000', fontSize: 20 },
        h3: { fontFamily: 'Poppins_700Bold', color: '#000', fontSize: 18 },
        a: { color: '#86BC25' },
        strong: { fontFamily: 'Poppins_700Bold' },
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} resizeMode="cover" />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.focusBadge}>
                        <Text style={styles.focusText}>{focus}</Text>
                    </View>
                    <View style={styles.divider} />
                    <RenderHtml
                        contentWidth={width - 48}
                        source={{ html: description }}
                        tagsStyles={tagsStyles}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '100%',
        height: 280,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontFamily: 'Poppins_700Bold',
        marginBottom: 12,
    },
    focusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#86BC25',
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    focusText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13,
        color: '#fff',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginBottom: 20,
    },
});

export default CampusDetail;
