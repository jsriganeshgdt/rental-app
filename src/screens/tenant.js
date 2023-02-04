//import liraries
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { Component, useState ,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';
import { getHouseList, getTenantList } from '../commonfunctions/firebaseMethods';
import { AddOption } from '../components/addOption';
import { TenantCard } from '../components/cards';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';
import { ScreenName } from '../utils/screenName';
// create a component
const Tenant = () => {

  const [listOfHouseNo, setHouseNoList] = useState([])


  const navigation = useNavigation()
  const navigateCreateTenant = ()=>{
    navigation.navigate(ScreenName.CreateTenant)
  }

  const[tenantList,setTenantList]=useState([])

  const isFocused= useIsFocused()

  useEffect(()=>{
    getHouseListDetails()
    getListOfTenant()
  },[isFocused])


  const getListOfTenant=async()=>{
    
   changeSpinnerFlag(true)
   const result = await getTenantList(1)
   changeSpinnerFlag(false)
   console.log("======"+result.status)
   if (result.status) {
    setTenantList(result.data)
  } else {
     alert(result.message)
   }
  }

  const getHouseListDetails= async()=>{
    changeSpinnerFlag(true)
    const houseList = await getHouseList(1)
    changeSpinnerFlag(false)
    // console.log(houseList)
    if( houseList.status &&  houseList.data && houseList.data.length>0){

        var list=[]
        for (const obj of houseList.data) {
            list.push({id:obj.key,name:obj.houseNo})
        }

        setHouseNoList(list)


        console.log(list)

    }else{
        setHouseNoList([])
    }
}

const findHouseList =(id)=>{
  for (const obj of listOfHouseNo) {
      if(obj.id == id){
          return obj.name
      }
  }
}


  return (
    <View style={styles.container}>
        <PageHeader title={label.Tenant}/>
        <ScrollView>
        <View style={{flex:1,paddingBottom:60}}>
          
           {
            tenantList.length > 0 ?
            tenantList.map((item,index)=>{
              return(
                <TouchableOpacity key={index} onPress={()=>{
                  navigation.navigate(ScreenName.CreateTenant,{selectedDetails:item})
                }} >
                  <TenantCard details={item} houseNoDetails={findHouseList(item.houseNo)}/>
                </TouchableOpacity>
              )
            })
            
            : null
          }
        </View>
        </ScrollView>
        <AddOption callBack={navigateCreateTenant}/>
        <Footer/>
    </View>
  );
};

//make this component available to the app
export default Tenant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor,
    },
});