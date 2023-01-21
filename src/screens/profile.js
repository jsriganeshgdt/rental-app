//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { defaultImage } from '../utils/config';
import { label } from '../utils/labels';
import { ScreenName } from '../utils/screenName';
// create a component
const Profile = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <PageHeader title={label.Profile} />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: 60 }}>

          <View style={{ backgroundColor: colors.white, paddingHorizontal: 20,paddingTop:20 }}>
            <Image source={{ uri: defaultImage }} style={{ height: 80, width: 80, borderRadius: 50, alignSelf: "center" }} />

            <View style={{ flexDirection: "row", }}>
              <Text style={{ fontSize: 14 }}>{"Name : "}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>{"Suganth"}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text style={{ fontSize: 14 }}>{"Mobile No : "}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>{"9876543212"}</Text>
            </View>

          </View>


          <TouchableOpacity onPress={()=>{navigation.navigate(ScreenName.PaymentScreen)}} style={{paddingVertical:15,borderBottomColor:colors.white,borderBottomWidth:0.5,paddingHorizontal:15,justifyContent:"space-between",flexDirection:"row"}}>
          <Text style={{ fontWeight: "bold", fontSize: 16,color:colors.white }}>{label.payment}</Text>
          <Image style={{height:18,width:18,tintColor:colors.white,transform: [{ rotate: '270deg'}]}} source={require("../../assets/images/downIcon.png")}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate(ScreenName.SettlementScreen)}} style={{paddingVertical:15,borderBottomColor:colors.white,borderBottomWidth:0.5,paddingHorizontal:15,justifyContent:"space-between",flexDirection:"row"}}>
          <Text style={{ fontWeight: "bold", fontSize: 16,color:colors.white }}>{label.settlement}</Text>
          <Image style={{height:18,width:18,tintColor:colors.white,transform: [{ rotate: '270deg'}]}} source={require("../../assets/images/downIcon.png")}/>
          </TouchableOpacity>


        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

//make this component available to the app
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});