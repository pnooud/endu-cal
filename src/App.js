import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, View } from 'react-native';
import Navbar from './components/navbar';
import WeekList from './components/week-list';
import configureStore from './configureStore';

export default class App extends React.Component {

    render() {
        return (
            <Provider store={configureStore}>
                <View style={styles.container}>
                    <Navbar/>
                    <WeekList/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({

        container: {
            backgroundColor: '#fff',
            flex: 2,
            margin:0,
            flexDirection: 'column',
            alignItems: 'stretch',
        }
});