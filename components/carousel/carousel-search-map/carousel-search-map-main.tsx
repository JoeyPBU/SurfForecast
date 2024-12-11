import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import CarouselOptionsIcon from './accounts-settings';

type SearchMapCardProps = {
  height?: number;
  navigation: any;
};

const icon = require('../../../assets/add-beach-icon.png');

/* Displays the search bar, add-beach-icon and options icon
The bar and beach-icon navigate to AddLocation
The options icon navigates to Account*/
const SearchMapCard: React.FC<SearchMapCardProps> = ({ height = 60, navigation }) => {
  return (
    <View style={[styles.container, { height }]}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('AddLocation')}
      >
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.text}>Find the best Surfing Beaches!</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
          <CarouselOptionsIcon onPress={() => navigation.navigate('Account')} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    width: '80%',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    color: '#F8F8FF',
    fontSize: 16,
  },
  iconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchMapCard;
