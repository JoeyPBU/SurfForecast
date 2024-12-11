import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type AddLocationResultsProps = {
    filteredBeaches: Array<[string, string]>;
    handleAddLocation: (beachId: string) => void;
    handleRemoveLocation: (beachId: string) => void;
    isSearching: boolean;
};

/* Displays the Locations possible for the user to add */
const AddLocationResults: React.FC<AddLocationResultsProps> = ({ filteredBeaches, handleAddLocation, handleRemoveLocation, isSearching }) => {
    
    const getFontSize = (name: string) => {
        if (name.length > 20) return 14;
        if (name.length > 10) return 16; 
        return 18;
    };

    return (
        <View style={styles.container}>
            {isSearching && (
                <FlatList
                    data={filteredBeaches}
                    keyExtractor={(item) => item[1]}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <Text style={[styles.beachName, { fontSize: getFontSize(item[0]) }]}>
                                {item[0]}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handleAddLocation(item[1])}
                                >
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveLocation(item[1])}
                                >
                                    <Text style={styles.buttonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636',
        padding: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#1c1c1c',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    beachName: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    addButton: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    removeButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default AddLocationResults;
