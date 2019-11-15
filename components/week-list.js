import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, SectionList, FlatList, Text, Platform, Alert, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {getWeeks} from "../actions/week-list";


export class WeekList extends Component {

    componentDidMount() {
        this.props.fetchData(Date.now(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
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
                    <View key={item.key}>
                    <TouchableOpacity style={styleRace(item.closestA, item.closestB, item.closestC)}>
                        <Text>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                    { item.isStartOfYear ? <View style={styles.yearBar} ><Text>{item.startDate.format('YYYY')}</Text></View> : null }
                    </View>

                ))
            }
            </ScrollView>
        );
    }
}

var styleRace = function(closestA, closestB, closestC) {

    if(closestA <= 3){
        switch(closestA) {
            case 0:
                return [styles.button, styles.aRace];
            case 1:
                return [styles.button, styles.aRaceMinus1];
            case 2:
                return [styles.button, styles.aRaceMinus2];
            case 3:
                return [styles.button, styles.aRaceMinus3];
            default:
                return styles.button;
            }
    }

    if(closestB <= 2){
        switch(closestB) {
            case 0:
                return [styles.button, styles.bRace];
            case 1:
                return [styles.button, styles.bRaceMinus1];
            case 2:
                return [styles.button, styles.bRaceMinus2];
            case 3:
                return [styles.button, styles.bRaceMinus3];
            default:
                return styles.button;

        }
    } 
    if(closestC <= 1){
        switch(closestC) {
            case 0:
                return [styles.button, styles.cRace];
            case 1:
                return [styles.button, styles.cRaceMinus1];
            case 2:
                return [styles.button, styles.cRaceMinus2];
            case 3:
                return [styles.button, styles.cRaceMinus3];
            default:
                return styles.button;

        }
    } 
    return styles.button;  
}


WeekList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    weekList: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
      button: {
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: 'whitesmoke',
        marginTop:5
      } ,
      aRace: {
         backgroundColor: '#ff1a1a'
      } ,
      aRaceMinus1: {
        backgroundColor: '#ff4d4d'
      },
      aRaceMinus2: {
        backgroundColor: '#ff9999'
      },
      aRaceMinus3: {
        backgroundColor: '#ffe6e6'
      },
      bRace: {
        backgroundColor: '#ff8000'
     } ,
     bRaceMinus1: {
       backgroundColor: '#ff9933'
     },
     bRaceMinus2: {
       backgroundColor: '#ffcc99'
     },
     bRaceMinus3: {
       backgroundColor: '#ffe6cc'
     },
     cRace: {
        backgroundColor: '#2eb82e'
     } ,
     cRaceMinus1: {
       backgroundColor: '#47d147'
     },
     cRaceMinus2: {
       backgroundColor: '#70db70'
     },
     cRaceMinus3: {
       backgroundColor: '#99e699'
     },
     yearBar: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        padding: 2,
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
