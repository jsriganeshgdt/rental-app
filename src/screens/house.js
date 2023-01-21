//import liraries
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,  TouchableOpacity } from 'react-native';
import { AddOption } from '../components/addOption';
import { HouseCard } from '../components/cards';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';
import { ScreenName } from '../utils/screenName';
import database from '@react-native-firebase/database';
import { getHouseList } from '../commonfunctions/firebaseMethods';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';

// create a component
const House = () => {

  const [listOfHouse,setHouseList]=useState([])

  const navigation = useNavigation()
  const navigateCreateHouse = ()=>{
    navigation.navigate(ScreenName.CreateHouse)
  }

  const isFocused= useIsFocused()

  useEffect(()=>{
    getListOfHouse()
  },[isFocused])


  const getListOfHouse=async()=>{
    
   changeSpinnerFlag(true)
   const result = await getHouseList(1)
   changeSpinnerFlag(false)

   if (result.status) {
      setHouseList(result.data)
  } else {
     alert(result.message)
   }
  }

  return (
    <View style={styles.container}>
      <PageHeader title={label.House} />
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: 60 }}>

          {
            listOfHouse.length > 0 ?
            listOfHouse.map((item,index)=>{
              return(
                <TouchableOpacity key={index} onPress={()=>{
                  navigation.navigate(ScreenName.CreateHouse,{selectedDetails:item})
                }} >
                  <HouseCard details={item}/>
                </TouchableOpacity>
              )
            })
            
            : null
          }
          
         
        </View>
      </ScrollView>

      <AddOption callBack={navigateCreateHouse}/>
      <Footer />
    </View>
  );
};

//make this component available to the app
export default House;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});