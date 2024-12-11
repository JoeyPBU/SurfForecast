import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

type LargeInfoCardWaveHeightProps = {
  waveHeight?: number;
  size?: number;
};

/* Converts the Wave Height into feet, formats, and displays it*/
const LargeInfoCardWaveHeight: React.FC<LargeInfoCardWaveHeightProps> = ({ waveHeight = 0 }) => {

  let waveHeightFeet: number = waveHeight * 3.28084

  let waveHeightLow: number = Math.floor(waveHeightFeet);
  let waveHeightHigh: number = Math.ceil(waveHeightFeet);

  const containerWidth = Dimensions.get('window').width;
  const fontSizeLarge = containerWidth * 0.28;
  const fontSizeSmall = fontSizeLarge * 0.6;

  return (
    <View style={[styles.container, { width: '100%', height: '100%' }]}>
      <View style={styles.row}>
        <Text style={[styles.text, { fontSize: fontSizeLarge, lineHeight: fontSizeLarge }]}>
          {waveHeightLow}-{waveHeightHigh}
        </Text>
        <Text style={[
          styles.text, 
          { fontSize: fontSizeSmall, lineHeight: fontSizeLarge, textAlignVertical: 'center' }
        ]}>
          ft
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 30,
  },
  text: {
    color: '#F8F8FF',
  },
});

export default LargeInfoCardWaveHeight;
