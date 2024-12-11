import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type LocationDisplayProps = {
  size?: number;
  locationName: string;
};

/* Displays the name of the beach for the carousel */
const CarouselLocationDisplay: React.FC<LocationDisplayProps> = ({ size = 60, locationName }) => {
  return (
    <View style={[styles.container, { width: '100%', height: size }]}>
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        {locationName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 25,
    justifyContent: 'center',
  },
  text: {
    color: '#F8F8FF',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'left',
  }
});

export default CarouselLocationDisplay;
