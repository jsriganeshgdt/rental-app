//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { label } from '../utils/labels';
// create a component
const Home = () => {


  const houseList =[
    // {houseNo:"1/12",
    // landmark:"Near by post office",
    // Available:true,
    // },
    // {houseNo:"12 a",
    // landmark:"Near by School",
    // Available:false,    
    // tenantName:"Sri"
    // },
    // {houseNo:"1/12",
    // landmark:"Near by post office",
    // Available:true,
    // },
    // {houseNo:"1/12",
    // landmark:"Near by post office",
    // Available:true,
    // },
    // {houseNo:"12 a",
    // landmark:"Near by School",
    // Available:false,
    // tenantName:"Ganesh"
    // },
    // {houseNo:"12 a",
    // landmark:"Near by School",
    // Available:false,
    // tenantName:"Vinoth"
    // },
    // {houseNo:"1/12",
    // landmark:"Near by post office",
    // Available:true
    // },
    // {houseNo:"12 a",
    // landmark:"Near by School",
    // Available:false,
    // tenantName:"shareef"

    // },
    // {houseNo:"12 a",
    // landmark:"Near by School",
    // Available:false,
    // tenantName:"sreeja"
    // }

  ]

  return (
    <View style={styles.container}>
        <PageHeader title={label.homeScreenTitle}/>
        <ScrollView>
        <View style={{flex:1,paddingBottom:60,paddingHorizontal:15}}>           
           
           <View style={{}}>
            {
              houseList.length>0?
              houseList.map((item,index)=>{
                return(
                  <TouchableOpacity key={index} style={{backgroundColor:colors.white,borderRadius:6,flexDirection:"row",marginVertical:10,paddingVertical:10,paddingHorizontal:10}}>

                    <Image style={{height:50,width:50,tintColor:item.Available ? colors.green : "#bbb",alignSelf:"center"}} source={require("../../assets/images/dbHouseLogo.png")}/>
                    <View style={{ marginLeft: 10, flex: 0.7,justifyContent:"space-evenly" }}>
                        <View style={{ flexDirection: "row",}}>
                            <Text style={{ fontSize: 14 }}>{"House No : "}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.houseNo}</Text>
                        </View>


                        <View style={{ flexDirection: "row",}}>
                            <Text style={{ fontSize: 14 }}>{"Land mark : "}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.landmark}</Text>
                        </View>

                        <View style={{ flexDirection: "row",}}>
                            <Text style={{ fontSize: 14 }}>{"Tenant Name : "}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item?.tenantName ? item?.tenantName :"-"}</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                )
              })
              : null
            }
            </View>
        </View>
        </ScrollView>
        <Footer/>
    </View>
  );
};

//make this component available to the app
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor,
    },
});