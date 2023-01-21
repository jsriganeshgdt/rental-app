//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../utils/screenName';
import { footerList } from '../utils/config';
import store from '../redux/store/store';
import { ActionTypes } from '../redux/action/actionList';
import { connect } from 'react-redux';
import SearchableDropdown from 'react-native-searchable-dropdown';

export const SingleSelectDropDown = ({ label, onChange, value,optionList }) => {

    // const [selectedValue, setSelectedVal] = useState(value)
    // const [opt, setOpt] = useState(optionList)
    const opt = optionList
    const selectedValue = value
    const [showOption, setShowOption] = useState(false)
    // useState(()=>{
    //     value != undefined  && setSelectedVal(value)
    // },[])
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{ fontSize: 12 }}>{label}{" :"}</Text>
            <TouchableOpacity style={styles.textBoxStyle} onPress={() => { 
                setShowOption(!showOption) 
                
                }} >

                <Text>{selectedValue?.name}</Text>
                <Image source={require("../../assets/images/downIcon.png")} style={{height:20,width:20,tintColor:"#bbb"}}/>
            </TouchableOpacity>

            {
                showOption && opt.length > 0 ?

                <ScrollView style={{maxHeight:200}}>
                    <View>

                        {
                            opt.map((itm, index) => {
                                return <TouchableOpacity key={index} style={styles.optBoxStyle} onPress={() => { 
                                    onChange(itm)
                                    // setSelectedVal(itm)
                                    setShowOption(false) 
                                    }} >
                                    <Text>{itm.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                    </ScrollView>
                    : null
            }

        </View>
    )
}


const styles = StyleSheet.create({
    textBoxStyle: {
        flexDirection:"row",
        alignItems:'flex-end',
        height: 30,
        padding: 0,
        borderBottomColor: colors.backgroundColor,
        borderBottomWidth: 1,
        justifyContent:"space-between"
    },
    optBoxStyle: {
        paddingHorizontal:10,
        justifyContent:"center",
        height: 30,
        padding: 0,
        backgroundColor: "#bbbb",
        borderBottomWidth: 0.7,
        borderBottomColor:"#888888"
    },

});