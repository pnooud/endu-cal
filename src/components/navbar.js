import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Navbar extends Component {
    render() {
        return (
            <View style={styles.NavBarStyle}>
                <Text style={styles.NavBarTitleStyle}>endurance calendar</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    NavBarStyle:{
        height: (Platform.OS) == 'ios' ? 98 : 90,
        backgroundColor: 'whitesmoke',
        justifyContent:'space-around',
        marginVertical: 10,
        alignItems: 'center'
    },
    NavBarTitleStyle:{
        fontFamily: 'Palatino',
        fontSize: 20
    }

});