import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native'
import Navbar from './navbar'
import WeekList from './week-list'

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Navbar/>
                <WeekList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

        container: {
            backgroundColor: '#fff',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
        }
});