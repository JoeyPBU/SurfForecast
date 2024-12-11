import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const arrowEast = require('./../../../../../../assets/directional-icons/arrow-east.png');
const arrowNorthEast = require('./../../../../../../assets/directional-icons/arrow-north-east.png');
const arrowNorthWest = require('./../../../../../../assets/directional-icons/arrow-north-west.png');
const arrowNorth = require('./../../../../../../assets/directional-icons/arrow-north.png');
const arrowSouthEast = require('./../../../../../../assets/directional-icons/arrow-south-east.png');
const arrowSouthWest = require('./../../../../../../assets/directional-icons/arrow-south-west.png');
const arrowSouth = require('./../../../../../../assets/directional-icons/arrow-south.png');
const arrowWest = require('./../../../../../../assets/directional-icons/arrow-west.png');

type SwellDirectionProps = {
  direction: number;
  size?: number;
};

/* Calculates the cardinal direction of the swell based on passed props */
const getDirectionIcon = (direction: number) => {
  if (direction >= 337.5 || direction < 22.5) return arrowNorth;
  if (direction >= 22.5 && direction < 67.5) return arrowNorthEast;
  if (direction >= 67.5 && direction < 112.5) return arrowEast;
  if (direction >= 112.5 && direction < 157.5) return arrowSouthEast;
  if (direction >= 157.5 && direction < 202.5) return arrowSouth;
  if (direction >= 202.5 && direction < 247.5) return arrowSouthWest;
  if (direction >= 247.5 && direction < 292.5) return arrowWest;
  if (direction >= 292.5 && direction < 337.5) return arrowNorthWest;
  return arrowNorth;
};

/* Displays the Icon based on the direction of the swell */
const LargeInfoCardSwellDirection: React.FC<SwellDirectionProps> = ({ direction, size = 30 }) => {
  const icon = getDirectionIcon(direction);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    padding: 3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default LargeInfoCardSwellDirection;
