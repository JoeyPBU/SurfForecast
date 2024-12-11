import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

type LiveFeedVideoProps = {
};

/* Displays a image to mock a livestream footage of the beach*/
const LiveFeedVideo: React.FC<LiveFeedVideoProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/surf-live.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: '95%',
    marginTop: '1%',
    flexDirection: 'column',
    backgroundColor: '#008080',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default LiveFeedVideo;
