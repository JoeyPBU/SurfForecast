import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text, StatusBar, Platform} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ScrollView, GestureHandlerRootView, FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import dataDecider from '../services/API/APIHandler';

import SearchMapCard from '../components/carousel/carousel-search-map/carousel-search-map-main';

import CarouselHeader from '../components/carousel/carousel-header/carousel-header-main';
import CarouselCardWave from '../components/carousel/carousel-wave-card/carousel-card-wave';
import HourlyForecastCard from '../components/carousel/carousel-hourly-forecast-card/carousel-hourly-forecast-main';
import LiveFeedCard from '../components/carousel/carousel-live-feed-card/carousel-live-feed-main';
import DailyForecastCard from '../components/carousel/carousel-daily-forecast-card/carousel-daily-forecast-main';
import TideGraphCard from '../components/carousel/carousel-tide-graph-card/tide-graph-card-main'
import WaveEnergyCard from '../components/carousel/carousel-wave-energy-card/wave-energy-card-main';
import WaveConsistencyCard from '../components/carousel/carousel-wave-consistency-card/wave-consistency-card-main';

/* Carousel Screen 
Handles the height of the Carousel Screen Components
Fetches the data from the jsons (mock API)
Fetches the user data
Handles converting the raw data into averaged data
Passes data to all children components
Displays
 A ScrollView containing all
 SearchMapCard - navigation to AddLocation
 CarouselCardWave
 HourlyForecastCard
 LivefeedCard
 DailyForecastCard
 TideGraphCard
 WaveEnergyCard
 WaveConsistencyCard
 */
const CarouselScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(1);
  const [userBeaches, setUserBeaches] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  /* Ensures the heights of each child component is maintainable */
  const componentHeights = {
    searchMapHeight: 60,
    headerHeight: 100,
    cardWaveHeight: 350,
    hourlyForecastHeight: 130,
    liveFeedHeight: 300,
    dailyForecastHeight: 210,
    tideGraphHeight: 200,
    waveEnergyHeight: 100,
    waveConsistencyHeight: 100,
    margins: 80,
  };

  const totalHeight = Object.values(componentHeights).reduce((acc, curent_value) => acc + curent_value, 0);

  const beachDataJsons = {
    'fistral_beach': require('../services/API/fistral_beach.json'),
    'gold_coast_beach': require('../services/API/gold_coast_beach.json'),
    'ngarunui_beach': require('../services/API/ngarunui_beach.json'),
    'pearl_jumeriah': require('../services/API/pearl_jumeriah.json'),
    'plage_des_blancs_sablons': require('../services/API/plage_des_blancs_sablons.json'),
    'praia_do_recreio': require('../services/API/praia_do_recreio.json'),
    'riviera_in_ghajn_tuffieha_bay': require('../services/API/riviera_in_ghajn_tuffieha_bay.json'),
    'scheveningen': require('../services/API/scheveningen.json'),
    'swanage_beach': require('../services/API/swanage_beach.json'),
  };

  /* Fetches userData and assigns active user
     Fetches userBeaches and extracts active user's beaches
     Navigates to AddLocation if there are no beaches in active users userBeaches */
  const fetchUserBeaches = async () => {
    try {
      const accountData = await AsyncStorage.getItem('account-info');
      if (!accountData) {
        console.warn('No account information found.');
        setUserBeaches([]);
        setLoading(false);
        return;
      }
  
      const parsedAccountData = JSON.parse(accountData);
      let activeUserID = null;
  
      for (const [userID, userDetails] of Object.entries(parsedAccountData)) {
        if (userDetails.userToken === true) {
          activeUserID = userID;
          console.log(`Active user: ${activeUserID}`);
          break;
        }
      }
  
      const storedBeaches = await AsyncStorage.getItem('user-beaches');
      console.log('storedBeaches:', storedBeaches);
      console.log('accountData', accountData);
  
      if (storedBeaches) {
        const parsedBeachesData = JSON.parse(storedBeaches);
  
        if (parsedBeachesData?.[activeUserID] && Array.isArray(parsedBeachesData[activeUserID])) {
          const beachNames = parsedBeachesData[activeUserID];
          console.log(`Beach names for active user (${activeUserID}):`, beachNames);
  
          if (JSON.stringify(beachNames) !== JSON.stringify(userBeaches)) {
            setUserBeaches(beachNames);
            await fetchBeachesData(beachNames);
          }
  
          if (beachNames.length === 0) {
            console.log("here");
            navigation.navigate('AddLocation');
          }
        } else {
          console.error(`Expected beaches array for user ${activeUserID}, but got:`, parsedBeachesData?.[activeUserID]);
          setUserBeaches([]);
        }
      } else {
        console.warn('No beaches found in AsyncStorage.');
        setUserBeaches([]);
      }
    } catch (error) {
      console.error('Error fetching user beaches:', error);
    } finally {
      setLoading(false);
    }
  };    

  /* fetches the raw beaches data and sends it through the dataDecider to average it for ease of use */
  const fetchBeachesData = async (beachNames) => {
    const beachesData = {};
    for (const beach of beachNames) {
      if (beachDataJsons[beach]) {
        try {
          beachesData[beach] = dataDecider(beachDataJsons[beach]);
        } catch (error) {
          console.error(`Error processing data for beach: ${beach}`, error);
        }
      } else {
        console.warn(`Data file not found for beach: ${beach}`);
      }
    }
    setWeatherData(beachesData);
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchUserBeaches();
    };
  
    initialize();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserBeaches();
    }, [])
  );

  useEffect(() => {
    if (!loading && userBeaches.length === 0) {
      navigation.navigate('AddLocation');
    }
  }, [loading, userBeaches]);

  const getCurrentHour = () => {
    const now = new Date();
    const roundedMinutes = Math.round(now.getMinutes() / 60);
    const roundedHour = now.getHours() + roundedMinutes;
    return roundedHour % 24;
  };

  const currentHourIndex = getCurrentHour();

  if (userBeaches.length === 0) return null

  return (
    <ScrollView style={appStyles.container}>

      <SearchMapCard 
        height={componentHeights.searchMapHeight}
        navigation={navigation}
      />

      <Carousel
        loop={false}
        width={screenWidth}
        height={totalHeight}
        data={userBeaches}
        snapEnabled={false}
        panGestureHandlerProps={{
          activeOffsetX: [-15, 15],
        }}
        renderItem={({ item: beach }) => {

          const beachData = weatherData[beach];
          if (!beachData) return null;

          const waveHeight = beachData?.hours[currentHourIndex]?.waveHeight?.ad || 0;
          const swellDirection = beachData?.hours[currentHourIndex]?.swellDirection?.ad || 0;
          const swellHeight = beachData?.hours[currentHourIndex]?.swellHeight?.ad || 0;
          const swellPeriod = beachData?.hours[currentHourIndex]?.swellPeriod?.ad || 0;
          const windDirection = beachData?.hours[currentHourIndex]?.windDirection?.ad || 0;
          const windSpeed = beachData?.hours[currentHourIndex]?.windSpeed?.ad || 0;

          return (
            <View style={carouselCardStyles.body}>

              <CarouselHeader 
                height={componentHeights.headerHeight}
                beach={beach} 
              />

              <CarouselCardWave 
                height = {componentHeights.cardWaveHeight}
                waveHeight = {waveHeight}
                swellDirection = {swellDirection}
                swellHeight = {swellHeight}
                swellPeriod = {swellPeriod}
                windDirection = {windDirection}
                windSpeed = {windSpeed} 
              /> 

              <HourlyForecastCard 
                height={componentHeights.hourlyForecastHeight}
                beachData = {beachData}
              />

              <LiveFeedCard 
                height={componentHeights.liveFeedHeight}
              />

              <DailyForecastCard
                height={componentHeights.dailyForecastHeight}
                beachData={beachData} 
              />

              <TideGraphCard 
                height={componentHeights.tideGraphHeight}
                beachData={beachData}
              />

              <WaveEnergyCard 
                height={componentHeights.waveEnergyHeight}
              />

              <WaveConsistencyCard 
                height={componentHeights.waveConsistencyHeight}
              />
            </View>
          );
        }}
      />
    </ScrollView>
  );
  
};

const appStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1c1c1c',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

const carouselCardStyles = StyleSheet.create({
  body: {
    width: Dimensions.get('window').width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});



export default CarouselScreen;
