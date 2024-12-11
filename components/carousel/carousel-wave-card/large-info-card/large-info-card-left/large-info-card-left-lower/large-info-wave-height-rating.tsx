import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type LargeInfoCardWaveHeightRatingProps = {
  waveHeight?: number;
  size?: number;
};

/* Displays the wave rating */
const LargeInfoCardWaveHeightRating: React.FC<LargeInfoCardWaveHeightRatingProps> = ({ waveHeight = 0, size = 40 }) => {
  let waveHeightFeet: number = waveHeight * 3.28084
  let waveRating = getWaveQuality(waveHeightFeet);

  return (
    <View style={[styles.container, { width: '100%', height: size }]}>
      <Text style={styles.text}>{waveRating}</Text>
    </View>
  );
};

/* Calculates the wave rating based on the waveHeight in feet */
function getWaveQuality(waveHeight?: number): string {
  switch (true) {
    case waveHeight <= 1:
      return "Flat";
    case waveHeight <= 3:
      return "Choppy";
    case waveHeight <= 5:
      return "Rideable";
    case waveHeight <= 8:
      return "Clean";
    case waveHeight <= 12:
      return "Solid";
    case waveHeight > 12:
      return "Epic";
    default:
      return "No Data";
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    borderRadius: 10,
    padding: 5,
    marginLeft: 15,
  },
  text: {
    color: '#F8F8FF',
    fontSize: 20,
  },
});

export default LargeInfoCardWaveHeightRating;
