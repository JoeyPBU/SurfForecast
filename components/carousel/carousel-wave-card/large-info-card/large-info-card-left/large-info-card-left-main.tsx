import React from 'react';
import { View, StyleSheet } from 'react-native';

type LargeInfoCardLeftProps = {
  children?: React.ReactNode;
};

/* Container Component for Left side of Wave Card */
const LargeInfoCardLeft: React.FC<LargeInfoCardLeftProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '55%',
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginLeft: 5,
    marginBottom: 15,
  },
});

export default LargeInfoCardLeft;
