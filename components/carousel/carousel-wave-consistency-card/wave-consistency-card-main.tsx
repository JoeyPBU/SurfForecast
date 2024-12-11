import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type WaveConsistencyCard = {
  children?: React.ReactNode;
  height?: number;
};

/* Displays the Wave Consitency Card */
const WaveConsistencyCard: React.FC<WaveConsistencyCard> = ({ height }) => {
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.text}>Wave Consistency</Text>
      <Text style={styles.textPro}>Purchase Pro to Unlock this feature!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(169, 169, 169, 0.25)',
    margin: 5,
    width: '96%',
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    color: '#F8F8FF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  textPro: {
    marginTop: 15,
    alignSelf: 'center',
    
    color: '#F8F8FF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default WaveConsistencyCard;
