import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Login Screen
Fetches account-info and finds active user
Handles Logging in
Displays
 Email Input
 Password input */
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchAccountInfo = async () => {
        try {
            const data = await AsyncStorage.getItem('account-info');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error fetching account info:', error);
            return {};
        }
    };

    /* Handles the inputs of all components
       Ensures all fields are filled
       Ensures attempted sign in is in account-info
       Sets all userTokens to false (to avoid multiple active users)
       Sets newly logged in user's userToken to true */
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            const accountData = await fetchAccountInfo();

            Object.keys(accountData).forEach(key => {
                if (accountData[key].userToken) {
                    accountData[key].userToken = false;
                }
            });

            const userKey = Object.keys(accountData).find(
                key => accountData[key].email === email && accountData[key].encryptedpassword === password
            );

            if (userKey) {
                accountData[userKey].userToken = true;

                if (!accountData.GuestID) {
                    accountData.GuestID = { userToken: false };
                }

                await AsyncStorage.setItem('account-info', JSON.stringify(accountData));

                Alert.alert('Login Successful', 'Welcome back!');
                navigation.navigate('Carousel');
            } else {
                Alert.alert('Login Failed', 'Incorrect email or password.');
            }
        } catch (error) {
            console.error('Error during login process:', error);
            Alert.alert('Login Failed', 'An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to Surfline</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.secondaryButtonText}>Go to Sign Up</Text>
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
        marginBottom: 5,
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
        marginBottom: 5,
    },
    secondaryButtonText: {
        color: '#F8F8FF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Login;
