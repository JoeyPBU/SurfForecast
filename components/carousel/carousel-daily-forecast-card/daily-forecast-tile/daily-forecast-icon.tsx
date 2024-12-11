import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';

interface DailyForecastIconProps {
  size?: number;
  rotation?: boolean;
}

/* Displays the up/down icon, refering to highest or lowest wave of the day */
const DailyForecastIcon: React.FC<DailyForecastIconProps> = ({ size = 30, rotation = false }) => {
  const icon: ImageSourcePropType = rotation
    ? require('./../../../../assets/up-icon.png')
    : require('./../../../../assets/down-icon.png');


  return (
    <View style={[styles.container, { width: size, height: size * 2.3 }]}>
      <Image source={icon} style={[styles.icon]} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default DailyForecastIcon;
