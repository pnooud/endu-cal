import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, SectionList, FlatList, Text, Platform, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {getWeeks} from "../actions/week-list";


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
            
            <ScrollView style={styles.container}>{console.log(this.props.weekList)}
            {
                this.props.weekList.map(item => (
                    <TouchableOpacity key={item.key} style={item.races.length == 0 ? styles.button : styles.aRace}>
                        <Text>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
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
      button: {
        alignItems: 'left',
        padding: 10,
        backgroundColor: 'whitesmoke',
        marginTop:5
      } ,
      aRace: {
        alignItems: 'left',
        padding: 10,
        backgroundColor: 'red',
        marginTop:5
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
