import React, {Component} from 'react';
import { StyleSheet, View, SectionList, FlatList, Text, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/action-types';
import {getWeeks} from "../actions/action-types";


export class WeekList extends React.Component {

    componentDidMount() {
        this.props.fetchData(Date.now(), '2019-01-01');
    }
    // GetSectionListItem=(item)=>{
    //     Alert.alert(item)
    // }

    //state = {selected: (new Map()}

    _keyExtractor = (item, index) => item.startDate;

    // _onPressItem = (id) => {
    //     // updater functions are preferred for transactional updates
    //     this.setState((state) => {
    //         // copy the map rather than modifying state.
    //         const selected = new Map(state.selected);
    //         selected.set(id, !selected.get(id)); // toggle
    //         return {selected};
    //     });
    // };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.startDate}
            //onPressItem={this._onPressItem}
            //selected={!!this.state.selected.get(item.startDate)}
            title={item.startDate}
        />
    );

    render() {

        // var jan = ['RR 3 miles', 'SR 4 miles', 'B Race'] ;
        // var feb = ['BFR 5 miles', 'LR 15 miles', 'Chester Marathon'] ;
        // var mar = [ 'A Race'] ;


        return (

                <View style={{ marginTop :  20 }}>
                    {/*<SectionList*/}
                        {/*sections={[*/}
                            {/*{ title: 'January', data: jan },*/}
                            {/*{ title: 'February', data: feb },*/}
                            {/*{ title: 'March', data: mar },*/}
                        {/*]}*/}

                        {/*renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }*/}
                        {/*renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}> { item } </Text> }*/}
                        {/*keyExtractor={ (item, index) => index }*/}
                    {/*/>*/}
                    <FlatList
                        data={this.weekList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
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

// start of code change
const mapStateToProps = (state) => {
    return { 
        weeks: state.weekList, 
        hasErrored: state.weekListHasErrored, 
        isLoading: state.weekListIsLoading 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {fetchData: (startDate, endDate) => dispatch(getWeeks(startDate,endDate))}
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList);
