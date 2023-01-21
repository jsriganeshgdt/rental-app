//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors } from '../utils/colors';
import { defaultImage } from '../utils/config';
import { label } from '../utils/labels';
// create a component
export const TenantCard = ({details,houseNoDetails}) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: details.tenantImage ? details.tenantImage :defaultImage }} style={styles.imageTenantStyle} />
            <View style={{ marginLeft: 10, flex: 0.8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{details.tName}</Text>
                    {
                        houseNoDetails ?
                        <Text style={{ fontWeight: "bold", fontSize: 16, borderRadius: 50, borderWidth: 1, borderColor: colors.green, padding: 4 }}>{houseNoDetails}</Text>
                        : null
                    }
                </View>
                <Text style={{ fontSize: 12 }}>{details.tpNO}{" | "}{details.idCardNo}</Text>
                <Text style={{ fontSize: 12 }}>{details.adress}</Text>
            </View>
        </View>
    );
};



export const HouseCard = ({details}) => {
    var img = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    return (
        <View style={styles.housecontainer}>
            <Image source={{ uri: details.houseImage ? details.houseImage : img }} style={styles.houseImageStyle} />
            <View style={{ marginLeft: 10, flex: 0.7,justifyContent:"space-evenly" }}>
                <View style={{ flexDirection: "row",}}>
                    <Text style={{ fontSize: 14 }}>{"House No : "}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>{details.houseNo}</Text>
                </View>
                <View style={{ flexDirection: "row",flexWrap:'wrap'}}>
                    <Text style={{ fontSize: 14 }}>{"Building Name: "}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>{details.nameOfBuilding}</Text>
                </View>
                <Text style={{ fontSize: 12 }}>{details.address}</Text>
            </View>
        </View>
    );
};


//make this component available to the app

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    housecontainer: {
        // alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    imageTenantStyle: {
        flex: 0.2,
        height: 60,
        width: 50,
        borderRadius: 6
    },
    houseImageStyle: {
        flex: 0.3,
        height: 80,
        // width: 50,
        borderRadius: 6
    }
});