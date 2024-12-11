import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type LargeInfoCardRightUpper = {
  children?: React.ReactNode;
};

/* Container Component for upper right of info card*/
const LargeInfoCardRightUpper: React.FC<LargeInfoCardRightUpper> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '70%',
      height: '50%',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
});

export default LargeInfoCardRightUpper;
