import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type LargeInfoCardRightLower = {
  children?: React.ReactNode;
};

/* Container Component for Right Lower of the info card*/
const LargeInfoCardRightLower: React.FC<LargeInfoCardRightLower> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default LargeInfoCardRightLower;
