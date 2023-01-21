//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { colors } from '../utils/colors';
// import {StyleSheet, Dimensions, PixelRatio} from 'react-native';

export const deviceWidth = Dimensions.get('screen').width;

// create a component
export const OverLaySpinner = ({visible}) => {
    return visible ? (
            <View style={styles.spinnerStyle}>
              <ActivityIndicator color={colors.subTheme} size={'small'} />
            </View>
          ) : (
            <></>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    spinnerStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 9999,
      },
});
