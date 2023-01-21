//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';
import { colors } from '../utils/colors';
import Menu from "react-native-vector-icons/Ionicons"
import Login from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// create a component
export const Header = ({login,isAdminLogin}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menu} onPress={()=>{
                navigation.openDrawer()
            }}>
                <Icon name='ios-menu' size={30} color={colors.black}/>
            </TouchableOpacity>
            <View style={styles.headerTextStyle}>
            <Text style={styles.headerText}>{"Lottery"}</Text>
            </View>

            {
                isAdminLogin ? 
                <View style={styles.button}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{navigation.navigate('UploadScreen')}}>
                    <Icon name="cloud-upload" color={colors.subTheme} size={20} />
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.button}>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>login()}>
                <Login name='login-variant' color={colors.subTheme} size={25}/>
                </TouchableOpacity>
            </View>
            }
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        flexDirection:"row",
        height:50,
        backgroundColor:colors.headerColor,
        // justifyContent:"center",
        alignItems:"center"
    },
    headerTextStyle:{
        flex:0.7,
        alignItems:"center"
    },
    headerText:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.black
    },
    menu:{
        flex:0.15,
        // alignItems:"/"
    },
    button:{
        flex:0.15,
        alignItems:"flex-end"
    },
    buttonStyle:{
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:colors.black,
        borderRadius:6
    },
    buttonLogin:{
        fontSize:16,
        fontWeight:"bold",
        color:colors.subTheme
    }
});

//make this component available to the app

export const PageHeader = ({title}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menu} onPress={()=>{navigation.goBack()}}>
                {/* <Icon name='arrow-back' size={30} color={colors.black}/> */}
            </TouchableOpacity>
            <View style={styles.headerTextStyle}>
            <Text style={styles.headerText}>{title}</Text>
            </View>

            {
                <View style={styles.button}>
                </View>
                
            }
            
        </View>
    );
}
