import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

type AddLocationHeaderProps = {
    searchQuery: string;
    onSearchQueryChange: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
};

const icon = require('../../assets/add-beach-icon.png');

/* AddLocationHeader displays a bar and add location icon. When pressed, reveals add-location-results */
const AddLocationHeader: React.FC<AddLocationHeaderProps> = ({ 
    searchQuery, 
    onSearchQueryChange, 
    onFocus, 
    onBlur 
}) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
            <TextInput
                placeholder="Tap here to search"
                placeholderTextColor="#F8F8FF"
                value={searchQuery}
                onChangeText={onSearchQueryChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        width: '96%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default AddLocationHeader;
