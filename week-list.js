import React, {Component} from 'react';
import { StyleSheet, View, SectionList, Text, Platform, Alert } from 'react-native'


export default class Weeks extends React.Component {

    GetSectionListItem=(item)=>{
        Alert.alert(item)
    }

    render() {

        var jan = ['RR 3 miles', 'SR 4 miles', 'B Race'] ;
        var feb = ['BFR 5 miles', 'LR 15 miles', 'Chester Marathon'] ;
        var mar = [ 'A Race'] ;

        return (

                <View style={{ marginTop : (Platform.OS) == 'ios' ? 20 : 0 }}>
                    <SectionList
                        sections={[
                            { title: 'January', data: jan },
                            { title: 'February', data: feb },
                            { title: 'March', data: mar },
                        ]}

                        renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
                        renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}> { item } </Text> }
                        keyExtractor={ (item, index) => index }
                    />
                </View>

        );
    }
}

const styles = StyleSheet.create({

    SectionHeaderStyle:{
        backgroundColor : '#CDDC39',
        fontSize : 20,
        padding: 5,
        color: '#fff',
    },

    SectionListItemStyle:{
        fontSize : 15,
        padding: 5,
        color: '#000',
        backgroundColor : '#F5F5F5'

    }
});