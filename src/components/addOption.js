import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';

export const AddOption = (props) => {
    return (
        <TouchableOpacity onPress={()=>{props.callBack()}} style={{position:"absolute",backgroundColor:colors.white,borderRadius:100,right:0,bottom:60,height:55,width:55}}>
            <Image source={require("../../assets/images/add.png")} style={{height:55,width:55}} />
        </TouchableOpacity>
    );
};