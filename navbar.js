import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Navbar extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', height: 25, backgroundColor: 'powderblue'}}>
                <Text>Endurance Calendar</Text>
            </View>
        );
    }
}