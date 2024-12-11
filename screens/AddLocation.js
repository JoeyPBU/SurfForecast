import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddLocationHeader from '../components/add-location/add-location-header';
import AddLocationResults from '../components/add-location/add-location-results';
import AddLocationMap from '../components/add-location/add-location-map';

const beachList = [
    ["Fistral Beach", "fistral_beach"],
    ["Gold Coast Beach", "gold_coast_beach"],
    ["Ngarunui Beach", "ngarunui_beach"],
    ["Pearl Jumeriah", "pearl_jumeriah"],
    ["Plage des Blancs Sablons", "plage_des_blancs_sablons"],
    ["Praia do Recreio", "praia_do_recreio"],
    ["Riviera in Ghanjn Tuffieha Bay", "riviera_in_ghajn_tuffieha_bay"],
    ["Scheveningen", "scheveningen"],
    ["Swanage Beach", "swanage_beach"]
];

/* AddLocation Screen
fetches userBeaches and account-info from the Async Storages
Handles adding and removing locations from active user's storage
Displays 
 Add Location Header
 Add Location Results (When Active)
 Add Location Map
 Return Home (navigate to carousel)*/
const AddLocation = ({ navigation }) => {
    const [userBeaches, setUserBeaches] = useState([]);
    const [activeUserID, setActiveUserID] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    /* Fetch information from user-beaches and account-info */
    useEffect(() => {
        const fetchUserBeaches = async () => {
            const storedBeaches = await AsyncStorage.getItem('user-beaches');
            if (storedBeaches) {
                const parsedBeachesData = JSON.parse(storedBeaches);
                if (parsedBeachesData?.[activeUserID] && Array.isArray(parsedBeachesData[activeUserID])) {
                    setUserBeaches(parsedBeachesData[activeUserID].filter(beach => beach));
                } else {
                    setUserBeaches([]);
                }
            }
        };

        const initializeUser = async () => {
            const accountData = await AsyncStorage.getItem('account-info');
            if (accountData) {
                const parsedAccountData = JSON.parse(accountData);
                const activeID = Object.keys(parsedAccountData).find(id => parsedAccountData[id].userToken === true);
                setActiveUserID(activeID);
            }
        };

        initializeUser();
        fetchUserBeaches();
    }, [activeUserID]);

    /* Adds selected beach to user-beaches for active user */
    const handleAddLocation = async (beach) => {
        const updatedBeaches = [...userBeaches, beach];
        try {
            const userBeachesData = await AsyncStorage.getItem('user-beaches');
            const parsedUserBeaches = userBeachesData ? JSON.parse(userBeachesData) : {};
            parsedUserBeaches[activeUserID] = updatedBeaches;
            await AsyncStorage.setItem('user-beaches', JSON.stringify(parsedUserBeaches));
            setUserBeaches(updatedBeaches);
        } catch (error) {
            console.error('Error updating beaches in AsyncStorage:', error);
        }
    };

    /* Removes selected beach from user-beaches for active user */
    const handleRemoveLocation = async (beach) => {
        const updatedBeaches = userBeaches.filter(userBeach => userBeach !== beach);
        try {
            const userBeachesData = await AsyncStorage.getItem('user-beaches');
            const parsedUserBeaches = userBeachesData ? JSON.parse(userBeachesData) : {};
            parsedUserBeaches[activeUserID] = updatedBeaches;
            await AsyncStorage.setItem('user-beaches', JSON.stringify(parsedUserBeaches));
            setUserBeaches(updatedBeaches);
        } catch (error) {
            console.error('Error removing beach from AsyncStorage:', error);
        }
    };

    /* Ensures beachNames are standardised for computation */
    const filteredBeaches = beachList.filter(([beachName]) =>
        beachName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    /* Collapses the Add Location Results if the keyboard is dismissed */
    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setIsSearching(false);
    };

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.container}>
                <AddLocationHeader
                    searchQuery={searchQuery}
                    onSearchQueryChange={(text) => {
                        setSearchQuery(text);
                        setIsSearching(text !== '');
                    }}
                    onFocus={() => setIsSearching(true)}
                    onBlur={() => {
                        if (!searchQuery) setIsSearching(false);
                    }}
                />

                {isSearching && (
                    <AddLocationResults
                        filteredBeaches={filteredBeaches}
                        handleAddLocation={handleAddLocation}
                        handleRemoveLocation={handleRemoveLocation}
                        isSearching={isSearching}
                    />
                )}

                <AddLocationMap />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carousel')}>
                    <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        marginTop: '6%',
    },
    button: {
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '96%',
        margin: 5,
    },
    buttonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddLocation;
