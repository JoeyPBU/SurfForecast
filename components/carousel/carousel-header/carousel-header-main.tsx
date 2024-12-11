import React from 'react';
import { View, StyleSheet } from 'react-native';

import CarouselLocationDisplay from './location-display';

type CarouselHeaderProps = {
  children?: React.ReactNode;
  height: number;
  beach: string;
  navigation: any;
};

/* Formats the name of the beach for display*/
const CarouselHeader: React.FC<CarouselHeaderProps> = ({ height, beach }) => {
  
  const displayLocationName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View style={[styles.header, { height }]}>
        <View style={styles.nameContainer}>
          <CarouselLocationDisplay locationName={displayLocationName(beach)} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#363636',
    paddingVertical: 20,
  },
  nameContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: '30%'
  },
});

export default CarouselHeader;
