import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* SignUp Screen
Fetches account Info
Updates Account Info for new user
Generates new userID
Handles SignUp
 Displays
  Email text input
  Password text input
  Confirm Password text input
  Sign Up button - navigates to Carousel
  Go home - navigates to Carousel */
const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [timezone, setTimezone] = useState('N/A');
    const [userId, setUserId] = useState(null);

    const fetchAccountInfo = async () => {
        try {
            const data = await AsyncStorage.getItem('account-info');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error fetching account info:', error);
            return {};
        }
    };

    const updateAccountInfo = async (data) => {
        try {
            await AsyncStorage.setItem('account-info', JSON.stringify(data));
        } catch (error) {
            console.error('Error updating account info:', error);
            Alert.alert('Error', 'Could not save account information.');
        }
    };

    
    const generateRandomID = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let randomID = '';
        for (let i = 0; i < 8; i++) {
            randomID += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return `user_${randomID}`;
    };

    /* Generates a unique ID by randomising a string of characters and sets it to the new user */
    const generateUniqueID = async () => {
        let uniqueID;
        let idExists = true;
        const accountData = await fetchAccountInfo();

        while (idExists) {
            uniqueID = generateRandomID();
            idExists = accountData && accountData[uniqueID];
        }

        setUserId(uniqueID);
        return uniqueID;
    };

    /* Ensures all fields are filled
       Ensures passwords match
       Handles generating a unique ID
       Creates a new user
       Handles updating user-accounts with new user
       creates a blank user-beaches for new user */
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }
    
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
    
        const newUserId = await generateUniqueID();
        if (!newUserId) {
            Alert.alert('Error', 'Could not generate a unique ID. Please try again.');
            return;
        }
    
        const newUser = {
            [newUserId]: {
                email,
                encryptedpassword: password,
                timezone,
                userToken: true,
            },
        };
    
        const accountData = await fetchAccountInfo();
        const updatedAccountData = { ...accountData };
    
        for (const userId in updatedAccountData) {
            if (updatedAccountData.hasOwnProperty(userId)) {
                updatedAccountData[userId].userToken = false;
            }
        }
    
        updatedAccountData[newUserId] = newUser[newUserId];
    
        await updateAccountInfo(updatedAccountData);
    
        let userBeaches = await AsyncStorage.getItem('user-beaches');
        userBeaches = userBeaches ? JSON.parse(userBeaches) : {};
        userBeaches[newUserId] = [];
    
        try {
            await AsyncStorage.setItem('user-beaches', JSON.stringify(userBeaches));
        } catch (error) {
            console.error('Error saving user beaches:', error);
            Alert.alert('Error', 'Could not save user beaches.');
        }
    
        Alert.alert('Sign Up Successful', 'Welcome!');
        navigation.navigate('Carousel');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up for Surfline</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#A9A9A9"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Carousel')}>
                <Text style={styles.secondaryButtonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#F8F8FF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
    },
    input: {
        borderRadius: 8,
        backgroundColor: '#1C1C1C',
        width: '100%',
        padding: 12,
        marginBottom: 20,
        color: '#F8F8FF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#A9A9A9',
    },
    button: {
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderColor: '#F8F8FF',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '100%',
    },
    secondaryButtonText: {
        color: '#F8F8FF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SignUp;
