import React, {Component} from 'react';
import TouchableOpacity from 'react-native';
import PropTypes from 'prop-types';
import { StyleSheet, View, SectionList, FlatList, Text, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import {getWeeks} from "../actions/action-types";


export class WeekList extends Component {

    componentDidMount() {
        this.props.fetchData(Date.now(), '2019-05-01');
    }

    render() {
        if (this.props.hasErrored) {
            return <Text>Sorry! There was an error loading the items</Text>;
        }

        if (!this.props.weekList || this.props.isLoading) {
            return <Text>Loading…</Text>;
        }

        return (
            <View>{console.log(this.props.weekList)}
            {
                
                this.props.weekList.map(item => (
                    <Text key = {item.key}>
                        {item.startDate.toISOString()}
                    </Text>
                ))
            }
            </View>
        );
    }
}

WeekList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    weekList: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

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

const mapStateToProps = (state) => {
    return { 
        weekList: state.weekList, 
        hasErrored: state.weekListHasErrored, 
        isLoading: state.weekListIsLoading 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {fetchData: (startDate, endDate) => dispatch(getWeeks(startDate,endDate))}
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList);
