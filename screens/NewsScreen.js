import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../components/NewsCard';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const categoryNames = {
  "": "All",
  "6a15a31fc8c19c898242704f": "Terugblik",
  "6a15a2ffd5b682036f2b2c58": "Nieuws",
  "6a15a2d2472ea5097e0082e0": "Activiteit",
};

const NewsScreen = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const [showFeatured, setShowFeatured] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortOption("title-asc");
  };

  useEffect(() => {
      fetch('https://api.webflow.com/v2/collections/6a134c6a37421d3256b98c05/items/live',
      {
        headers: {
          Authorization: 'Bearer f793e95b30f968796a1656b22d14563588d2c9c5f8bb59b9444c39d36f3e712e',
        },
      },
      )
        .then((response) => response.json())
        .then((data) => {
setArticles(data.items.map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            description: item.fieldData.intro,
            image: { uri: item.fieldData["afbeelding"].url },
            content: item.fieldData["inhoud"],
            featured: item.fieldData["uitgelicht"] ?? false,
            category: categoryNames[item.fieldData.categorie] || "Unknown category",
          })));
        })
        .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  const filteredArticles = articles.filter(
    (a) =>
      (!showFeatured || a.featured === true) &&
      (selectedCategory === "" || a.category === selectedCategory) &&
      a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView>
        
            <Text style={styles.sectionTitle}>Nieuws</Text>

            <TextInput
              placeholder="Zoek artikels..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholderTextColor="#888"
            />

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Categorie</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                >
                  <Picker.Item label="Alle categorieën" value="" />
                  <Picker.Item label="Terugblik" value="Terugblik" />
                  <Picker.Item label="Nieuws" value="Nieuws" />
                  <Picker.Item label="Activiteit" value="Activiteit" />
                </Picker>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sorteren</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={sortOption}
                  onValueChange={setSortOption}
                  style={styles.picker}
                >
                  <Picker.Item label="Naam: A tot Z" value="title-asc" />
                  <Picker.Item label="Naam: Z tot A" value="title-desc" />
                </Picker>
              </View>
            </View>

            <View style={styles.resetButtonContainer}>
              <Button title="Filters wissen" onPress={resetFilters} color="#86BC25" />
            </View>


        {sortedArticles.map((artikel) => (
          <NewsCard
            key={artikel.id}
            title={artikel.title}
            description={artikel.description}
            image={artikel.image}
            onPress={() =>
              navigation.navigate('NewsDetail', {
                title: artikel.title,
                description: artikel.description,
                content: artikel.content,
                image: artikel.image,
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
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  resetButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default NewsScreen;
