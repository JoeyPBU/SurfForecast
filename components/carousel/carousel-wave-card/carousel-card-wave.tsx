import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import LargeInfoCard from './large-info-card/large-info-main';
import LargeInfoCardLeft from './large-info-card/large-info-card-left/large-info-card-left-main';
import LargeInfoCardLeftUpper from './large-info-card/large-info-card-left/large-info-card-left-upper/large-info-card-left-upper-main';
import LargeInfoCardWaveHeight from './large-info-card/large-info-card-left/large-info-card-left-upper/large-info-wave-height';
import LargeInfoCardLeftLower from './large-info-card/large-info-card-left/large-info-card-left-lower/large-info-card-left-lower-main';
import CarouselDirectionIcon from '../carousel-universal/carousel-direction-icon';
import LargeInfoCardWaveHeightRating from './large-info-card/large-info-card-left/large-info-card-left-lower/large-info-wave-height-rating';
import LargeInfoCardRight from './large-info-card/large-info-card-right/large-info-card-right-main';
import LargeInfoCardRightUpper from './large-info-card/large-info-card-right/large-info-card-right-upper/large-info-card-right-upper-main';
import LargeInfoCardSwellHeight from './large-info-card/large-info-card-right/large-info-card-right-upper/large-info-swell-height';
import LargeInfoCardSwellPeriod from './large-info-card/large-info-card-right/large-info-card-right-upper/large-info-swell-period';
import LargeInfoCardRightLower from './large-info-card/large-info-card-right/large-info-card-right-lower/large-info-card-right-lower-main';
import LargeInfoCardWindSpeed from './large-info-card/large-info-card-right/large-info-card-right-lower/large-info-wind-speed';

type CarouselCardWaveProps = {
  height: number;
  waveHeight: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  windDirection: number;
  windSpeed: number;
};

/* Requires the images for the background of wave card */
const waveImages = {
  flat: require('../../../assets/waves/flat-wave.png'),
  choppy: require('../../../assets/waves/choppy-wave.png'),
  rideable: require('../../../assets/waves/rideable.png'),
  clean: require('../../../assets/waves/clean.png'),
  solid: require('../../../assets/waves/solid.png'),
  epic: require('../../../assets/waves/epic.png'),
};

/* Calculates which image to load based on wave height converted to feet */
function getWaveQuality(waveHeight: number) {
  let waveHeightFeet: number = waveHeight * 3.28084
  if (waveHeightFeet <= 1) return waveImages.flat;
  if (waveHeightFeet <= 3) return waveImages.choppy;
  if (waveHeightFeet <= 5) return waveImages.rideable;
  if (waveHeightFeet <= 8) return waveImages.clean;
  if (waveHeightFeet <= 12) return waveImages.solid;
  return waveImages.epic;
}

/* Container Component for the Wave Card
 Displays the background image
 Displays a Linear Gradient for background
 Displays the LargeInfoCard
 Passes Props for LargeInfoCard's children */
const CarouselCardWave: React.FC<CarouselCardWaveProps> = ({
  height,
  waveHeight,
  swellDirection,
  swellHeight,
  swellPeriod,
  windDirection,
  windSpeed,
}) => {
  return (
    <LinearGradient colors={['#363636', '#1c1c1c']} style={[styles.container, { height }]}>
      <ImageBackground 
        source={getWaveQuality(waveHeight)} 
        style={styles.imageBackground} 
        imageStyle={styles.overlayImage}
      >
        <LargeInfoCard>
          <LargeInfoCardLeft>
            <LargeInfoCardLeftUpper>
              <LargeInfoCardWaveHeight waveHeight={waveHeight} />
            </LargeInfoCardLeftUpper>
            <LargeInfoCardLeftLower>
              <LargeInfoCardWaveHeightRating waveHeight={waveHeight} />
            </LargeInfoCardLeftLower>
          </LargeInfoCardLeft>
          <LargeInfoCardRight>
            <Text style={styles.text}>Swell</Text>
            <LargeInfoCardRightUpper>
              <CarouselDirectionIcon direction={swellDirection} size={35} />
              <LargeInfoCardSwellHeight height={swellHeight} size={35} />
              <LargeInfoCardSwellPeriod time={swellPeriod} size={35} />
            </LargeInfoCardRightUpper>
            <Text style={styles.text}>Wind</Text>
            <LargeInfoCardRightLower>
              <CarouselDirectionIcon direction={windDirection} size={35} />
              <LargeInfoCardWindSpeed speed={windSpeed} size={35} />
            </LargeInfoCardRightLower>
          </LargeInfoCardRight>
        </LargeInfoCard>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  overlayImage: {
    resizeMode: 'contain',
    opacity: 0.5,
  },
  text: {
    color: '#F8F8FF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'left',
  },
});

export default CarouselCardWave;