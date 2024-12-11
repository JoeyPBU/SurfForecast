import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';


/* Account Screen
Handles: Logging Out as well as Deleting Account
Navigates to Sign Up if active user is Guest */
const Account = ({ navigation }) => {
    const [isGuest, setIsGuest] = useState(false);

    /* Checks if the current user is a Guest and sends to SignUp if true */
    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const accountInfo = await AsyncStorage.getItem('account-info');
                if (accountInfo) {
                    const parsedData = JSON.parse(accountInfo);
                    const currentUserKey = Object.keys(parsedData).find(
                        key => parsedData[key] && parsedData[key].userToken === true
                    );

                    if (currentUserKey && parsedData[currentUserKey].role === 'Guest') {
                        setIsGuest(true);
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        );
                    }
                }
            } catch (error) {
                console.error('Error checking user role:', error);
            }
        };

        checkUserRole();
    }, [navigation]);

    /* Sets the current user's userToken to False
       Sets the GuestID's userToken to True*/
    const handleLogout = async () => {
        try {
            const accountInfo = await AsyncStorage.getItem('account-info');
            if (accountInfo) {
                const parsedData = JSON.parse(accountInfo);
    
                const currentUserKey = Object.keys(parsedData).find(
                    key => parsedData[key] && parsedData[key].userToken === true
                );
    
                if (currentUserKey) {
                    parsedData[currentUserKey].userToken = false;
                }
    
                if (parsedData.GuestID) {
                    parsedData.GuestID.role = "Guest";
                    parsedData.GuestID.userToken = true;
                }
    
                await AsyncStorage.setItem('account-info', JSON.stringify(parsedData));
    
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
    
                Alert.alert('Logged Out', 'You have been successfully logged out.');
            } else {
                console.error('No account data found');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Could not log out. Please try again.');
        }
    };

    /* Removes the current users account from the Async Storage
       Sets GuestID's userToken to true */
    const handleDeleteAccount = async () => {
        try {
            const accountInfo = await AsyncStorage.getItem('account-info');
            if (accountInfo) {
                const parsedData = JSON.parse(accountInfo);
    
                const currentUserKey = Object.keys(parsedData).find(
                    key => parsedData[key] && parsedData[key].userToken === true
                );
    
                if (currentUserKey) {
                    delete parsedData[currentUserKey];
                }
    
                if (parsedData.GuestID) {
                    parsedData.GuestID.userToken = true;
                    parsedData.GuestID.role = 'Guest';
                }
    
                await AsyncStorage.setItem('account-info', JSON.stringify(parsedData));
    
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
    
                Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
            } else {
                console.error('No account data found');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', 'Could not delete account. Please try again.');
        }
    };

    if (isGuest) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Screen</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F8F8FF',
        marginBottom: 30,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
    },
    button: {
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '80%',
        marginBottom: 15,
    },
    buttonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '80%',
    },
    deleteButtonText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Account;
