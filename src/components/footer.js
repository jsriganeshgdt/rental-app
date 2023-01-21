//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../utils/screenName';
import { footerList } from '../utils/config';
import store from '../redux/store/store';
import { ActionTypes } from '../redux/action/actionList';
import { connect } from 'react-redux';


const Footer = (props) => {

    const [selectedFooter, setSelectedFooter] = useState(props.selectedFooter)

    const navigation = useNavigation()
    return (
        <View style={styles.container}>

            {
                footerList.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                store.dispatch({ type: ActionTypes.SELECT_FOOTER, payload: item });
                                navigation.navigate(item.screenName)
                            }}
                            style={[{ paddingVertical: 3, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, alignSelf: "center", borderRadius: 6, justifyContent: "space-between" },
                            selectedFooter.key == item.key ? { backgroundColor: colors.backgroundColor } : {}
                            ]}>
                            <Image source={item.image} style={[{ height: 22, width: 22, },

                            selectedFooter.key == item.key ? { tintColor: colors.subTheme } : { tintColor: colors.white }]} />
                            {
                                selectedFooter.key == item.key ?
                                    <Text style={{ color: colors.subTheme ,fontWeight:"bold",marginLeft:5}}>{item.name}</Text> : null
                            }

                        </TouchableOpacity>
                    )
                })
            }

        </View>
    );
}


const mapStateToProps = state => ({
    selectedFooter: state.footerSelection.selectedFooter,
});
export default connect(mapStateToProps)(Footer);

const styles = StyleSheet.create({

    container: {
        alignSelf: "center",
        position: "absolute", width: "99%",
        height: 45,
        borderRadius: 5,
        bottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        // marginHorizontal:5,
        paddingHorizontal: 10,
        backgroundColor: colors.footerColor,
        // marginVertical:5
    }

})