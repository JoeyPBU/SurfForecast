import React from 'react';
import { View, StyleSheet } from 'react-native';
import LiveFeedVideo from './live-feed-video/live-feed-video';
import LiveFeedVideoBar from './live-feed-video/live-feed-bar/live-feed-video-bar-main';

type LiveFeedCardProps = {
  height?: number;
  showAlternate: boolean;
};

/* Parent element to display the LiveFeedCard */
const LiveFeedCard: React.FC<LiveFeedCardProps> = ({ height }) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.videoCard}>
        <LiveFeedVideo />
        <LiveFeedVideoBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(128, 128, 128, 0.50)',
    borderRadius: 10,
    paddingBottom: '4%',
    width: '96%',
    margin: 20,
    alignItems: 'center',
  },
  videoCard: {
    width: '98%',
    alignItems: 'center',
  },
});

export default LiveFeedCard;
