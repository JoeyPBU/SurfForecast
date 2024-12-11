import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

type DailyForecastWaveHeightProps = {
  size?: number;
  waveHeight: number;
};


/* Displays the Wave Height min and max value, after converting to feet */
const DailyForecastWaveHeight: React.FC<DailyForecastWaveHeightProps> = ({ size = 45, waveHeight = 0 }) => {
    
    let waveHeightFeet: number = waveHeight * 3.28084

    let waveHeightLow: number = Math.floor(waveHeightFeet);
    let waveHeightHigh: number = Math.ceil(waveHeightFeet);

    const containerWidth = Dimensions.get('window').width;
    const fontSizeLarge = containerWidth * 0.04;
    const fontSizeSmall = fontSizeLarge * 0.6;
  return (
    <View style={[styles.container, { width: size, height: size / 1.5 }]}>
      <View style={styles.row}>
        <Text style={[styles.text, { fontSize: fontSizeLarge, lineHeight: fontSizeLarge }]}>
          {waveHeightLow}-{waveHeightHigh}
        </Text>
        <Text style={[
          styles.text, 
          { fontSize: fontSizeSmall, lineHeight: fontSizeLarge, textAlignVertical: 'center', marginLeft: 5 }
        ]}>
          ft
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default DailyForecastWaveHeight;
