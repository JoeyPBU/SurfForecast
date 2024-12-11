import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type SwellHeightProps = {
  size?: number;
  height: number;
};

/* Displays the height of the swell, after converting it to feet */
const LargeInfoCardSwellHeight: React.FC<SwellHeightProps> = ({ size = 50, height }) => {
  let swellHeightFeet: number = height * 3.28084
  const floorHeight = Math.floor(swellHeightFeet);
  const ceilHeight = Math.ceil(swellHeightFeet);

  return (
    <View style={[styles.container, { width: size * 1.5, height: size }]}>
      <Text style={styles.text}>
        {floorHeight}-{ceilHeight}ft
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default LargeInfoCardSwellHeight;
