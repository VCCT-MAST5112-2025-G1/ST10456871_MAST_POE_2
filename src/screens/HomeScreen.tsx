import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen() {
  const { starters, mains, desserts, deleteItem, visibleCategories } = useMenu();

  //this allows the average of each course section to be calculated

  const calculateAverage = (items: any[]) => {
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    return total / items.length;
  };

  const avgStarters = calculateAverage(starters);
  const avgMains = calculateAverage(mains);
  const avgDesserts = calculateAverage(desserts);
  const totalItems = starters.length + mains.length + desserts.length;

  //displays the information that is typed out on the add screen

  const renderItems = (items: any[], category: string) =>
    items.map((item, index) => (
      <View key={index} style={styles.menuItem}>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>{item.name} - R{item.price}</Text>
          <Text style={styles.menuDesc}>{item.description}</Text>
        </View>

        {/*delete button only appears once an item is added */}

        <TouchableOpacity onPress={() => deleteItem(category as any, index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    ));

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Menu</Text>

        <ScrollView
          style={{ maxHeight: 400, width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >

          {/*items are only displayed if they are selected on the filter screen */}
          {visibleCategories.includes('Starters') && (
            <>
              <Text style={styles.sectionTitle}>Starters</Text>
              {renderItems(starters, 'Starters')}
            </>
          )}

          {visibleCategories.includes('Mains') && (
            <>
              <Text style={styles.sectionTitle}>Mains</Text>
              {renderItems(mains, 'Mains')}
            </>
          )}

          {visibleCategories.includes('Desserts') && (
            <>
              <Text style={styles.sectionTitle}>Desserts</Text>
              {renderItems(desserts, 'Desserts')}
            </>
          )}
        </ScrollView>

        {/*counter displayes total number of items currnelty on the menu */}

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Total Items: {totalItems}</Text>
        </View>

        {/*average price of each course section is displayed */}

        <View style={styles.averageContainer}>
          <Text style={styles.averageTitle}>Average Prices</Text>
          <View style={styles.averageRow}>
            <Text style={styles.averageLabel}>Starters:</Text>
            <Text style={styles.averageValue}>R{avgStarters.toFixed(2)}</Text>
          </View>
          <View style={styles.averageRow}>
            <Text style={styles.averageLabel}>Mains:</Text>
            <Text style={styles.averageValue}>R{avgMains.toFixed(2)}</Text>
          </View>
          <View style={styles.averageRow}>
            <Text style={styles.averageLabel}>Desserts:</Text>
            <Text style={styles.averageValue}>R{avgDesserts.toFixed(2)}</Text>
          </View>
        </View>

        <StatusBar style="light" />
      </View>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  menuItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5a2e00',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  menuTextContainer: {
     flex: 1 
    },
  menuText: {
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
    },
  menuDesc: {
     color: '#ddd', 
     fontSize: 14 
    },
  deleteButton: {
     color: 'red', 
     fontWeight: 'bold', 
     marginLeft: 10 
    },
  counterContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: '#7a4a00',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  counterText: {
     color: 'white', 
     fontSize: 18, 
     fontWeight: 'bold' 
    },
  averageContainer: {
    width: '90%',
    marginTop: 10,
    backgroundColor: '#7a4a00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  averageTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 3,
  },
  averageLabel: {
     color: '#eee', 
     fontSize: 16 
    },
  averageValue: {
     color: 'white', 
     fontSize: 16, 
     fontWeight: 'bold' 
    },
});