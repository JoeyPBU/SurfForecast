import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';


/* Map component, fetches userBeaches and displays them. */
const AddLocationMap = () => {
    const [userBeaches, setUserBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialRegion, setInitialRegion] = useState(null);

    const beachDataJsons = {
        'fistral_beach': require('../../services/API/fistral_beach.json'),
        'gold_coast_beach': require('../../services/API/gold_coast_beach.json'),
        'ngarunui_beach': require('../../services/API/ngarunui_beach.json'),
        'pearl_jumeriah': require('../../services/API/pearl_jumeriah.json'),
        'plage_des_blancs_sablons': require('../../services/API/plage_des_blancs_sablons.json'),
        'praia_do_recreio': require('../../services/API/praia_do_recreio.json'),
        'riviera_in_ghajn_tuffieha_bay': require('../../services/API/riviera_in_ghajn_tuffieha_bay.json'),
        'scheveningen': require('../../services/API/scheveningen.json'),
        'swanage_beach': require('../../services/API/swanage_beach.json'),
    };

    /* Fetches the user beaches from the async storage */
    const fetchUserBeachNames = async () => {
        try {
            const accountData = await AsyncStorage.getItem('account-info');
            if (!accountData) {
                console.warn('No account information found.');
                setUserBeaches([]);
                setLoading(false);
                return;
            }

            const parsedAccountData = JSON.parse(accountData);
            const activeUserID = Object.keys(parsedAccountData).find(userID => parsedAccountData[userID].userToken);

            if (!activeUserID) {
                console.warn('No active user found.');
                setUserBeaches([]);
                setLoading(false);
                return;
            }

            const storedBeaches = await AsyncStorage.getItem('user-beaches');
            if (storedBeaches) {
                const parsedBeachesData = JSON.parse(storedBeaches);
                const beachNames = parsedBeachesData[activeUserID] || [];
                setUserBeaches(beachNames);

                if (beachNames.length > 0) {
                    const firstBeachKey = beachNames[0].toLowerCase().replace(/ /g, '_');
                    const firstBeachCoords = beachDataJsons[firstBeachKey]?.meta;
                    if (firstBeachCoords) {
                        setInitialRegion({
                            latitude: firstBeachCoords.lat,
                            longitude: firstBeachCoords.lng,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        });
                    }
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

    useEffect(() => {
        fetchUserBeachNames();
    }, []);

    const defaultGoldCoastRegion = {
        latitude: beachDataJsons.gold_coast_beach.meta.lat,
        longitude: beachDataJsons.gold_coast_beach.meta.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#171717" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#8ec3b9" }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#1a3646" }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{ "color": "#171717" }]
        },
        {
            "featureType": "poi",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#363636" }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#4e6d70" }]
        }
    ];

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={initialRegion || defaultGoldCoastRegion}
            >
                {Object.keys(beachDataJsons).map(beachKey => {
                    const { meta: beachCoords } = beachDataJsons[beachKey];
                    const isActiveBeach = userBeaches.some(beach => beach.toLowerCase().replace(/ /g, '_') === beachKey);

                    if (beachCoords) {
                        return (
                            <Marker
                                pinColor={isActiveBeach ? 'red' : 'yellow'}
                                key={`${beachKey}-${isActiveBeach ? true : false}`}
                                coordinate={{
                                    latitude: beachCoords.lat,
                                    longitude: beachCoords.lng
                                }}
                                title={beachKey.replace(/_/g, ' ')}
                            />
                        );
                    }
                    return null;
                })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        width: '96%',
        height: '96%',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    
});

export default AddLocationMap;