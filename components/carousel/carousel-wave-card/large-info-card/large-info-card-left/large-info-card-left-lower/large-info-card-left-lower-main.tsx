import React from 'react';
import { View, StyleSheet } from 'react-native';

type LargeInfoCardLeftLower = {
  children?: React.ReactNode;
};

/* Container Element for the Lower-Left */
const LargeInfoCardLeftLower: React.FC<LargeInfoCardLeftLower> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default LargeInfoCardLeftLower;
