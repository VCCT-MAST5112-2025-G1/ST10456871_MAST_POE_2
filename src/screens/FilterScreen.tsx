import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMenu, Category } from '../context/MenuContext';

export default function FilterScreen() {
  const { visibleCategories, toggleCategory, resetFilters } = useMenu();
  const categories: Category[] = ['Starters', 'Mains', 'Desserts'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <Text style={styles.subtitle}>Select categories to display:</Text>

      {/*these buttons work like checkboxes and once clicked will update the information on the menu screen */}

      <View style={styles.buttonGroup}>
        {categories.map((cat) => {
          const isActive = visibleCategories.includes(cat);
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.button, isActive && styles.activeButton]}
              onPress={() => toggleCategory(cat)}
            >
              <Text style={styles.buttonText}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/*resets everything on the menu screen */}

      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Reset Filters</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}

/*(React native. 2025)*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d1f00',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
     color: 'white', 
     fontSize: 36, 
     fontWeight: 'bold', 
     marginTop: 50, 
     marginBottom: 10
    },
  subtitle: {
     color: '#fff', 
     fontSize: 18, 
     marginBottom: 20 
    },
  buttonGroup: {
     flexDirection: 'row', 
     justifyContent: 'space-around', 
     width: '100%' 
    },
  button: {
     paddingVertical: 12, 
     paddingHorizontal: 20, 
     backgroundColor: '#7a4a00', 
     borderRadius: 10 
    },
  activeButton: {
     backgroundColor: '#a27c00' 
    },
  buttonText: {
     color: 'white', 
     fontWeight: 'bold', 
     fontSize: 16 
    },
  selectedText: {
     color: '#fff', 
     fontSize: 18, 
     fontWeight: 'bold', 
     marginTop: 8 
    },
  resetButton: {
     marginTop: 30, 
     backgroundColor: '#a27c00', 
     paddingVertical: 12, 
     paddingHorizontal: 30, 
     borderRadius: 10 
    },
  resetButtonText: {
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
    },
});

//(Byte Grad, Nova Design, Cosden Solutions)
