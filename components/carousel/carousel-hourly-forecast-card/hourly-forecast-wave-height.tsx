import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

type HourlyForecastWaveHeightProps = {
  size?: number;
  waveHeight: number;
};

/* Converts the wave height into feet before displaying it in the Hourly Forecast */
const HourlyForecastWaveHeight: React.FC<HourlyForecastWaveHeightProps> = ({ size = 60, waveHeight = 0 }) => {
    
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
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 10,
    marginTop: 15,
  },
  text: {
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default HourlyForecastWaveHeight;
