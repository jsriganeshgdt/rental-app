//import liraries
import { useIsFocused } from '@react-navigation/native';
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { changeSpinnerFlag } from '../commonfunctions/commonMethods';
import { getHouseList, getTenantList } from '../commonfunctions/firebaseMethods';
import Footer from '../components/footer';
import { Header, PageHeader } from '../components/header';
import { colors } from '../utils/colors';
import { houseStatus } from '../utils/config';
import { label } from '../utils/labels';
// create a component
const Report = () => {
  const [listOfHouseNo, setHouseNoList] = useState([])
  const [tenantList, setTenantList] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    getHouseListDetails()
    getListOfTenant()
  }, [isFocused])

  const getHouseListDetails = async () => {
    changeSpinnerFlag(true)
    const houseList = await getHouseList(1)
    changeSpinnerFlag(false)
    if (houseList.status && houseList.data && houseList.data.length > 0) {

      var list = []
      for (const obj of houseList.data) {
        list.push({ id: obj.key, name: obj.houseNo })
      }

      setHouseNoList(houseList.data)
      // setSelectedDetails(list)
    } else {
      setHouseNoList([])
    }
  }

  const getListOfTenant = async () => {

    changeSpinnerFlag(true)
    const result = await getTenantList(1)
    changeSpinnerFlag(false)

    if (result.status) {
      console.log("***********"+JSON.stringify(result.data))
      setTenantList(result.data)
    } else {
      alert(result.message)
    }
  }


  const headerRow = () => {
    return (
      <View style={{ flexDirection: "row", backgroundColor: colors.subTheme }}>
        <View style={{ flex: 0.2, borderWidth: 1, borderColor: colors.subTheme }}><Text style={styles.headertxtStyle}>{"House No"}</Text></View>
        <View style={{ flex: 0.2, borderWidth: 1, borderColor: colors.subTheme }}><Text style={styles.headertxtStyle}>{"Status"}</Text></View>
        <View style={{ flex: 0.3, borderWidth: 1, borderColor: colors.subTheme }}><Text style={styles.headertxtStyle}>{"Tenant Name"}</Text></View>
        <View style={{ flex: 0.3, borderWidth: 1, borderColor: colors.subTheme }}><Text style={styles.headertxtStyle}>{"Tenant Name"}</Text></View>
      </View>
    )
  }

  const checkStatus = (status) => {
    if (status) {
      if (status == 1) {
        return "Available"
      } else if (status == 2) {
        return "Booked"
      }
    } else {
      ""
    }
  }


  const findTenantNameDetails =(houseNo)=>{
    var list = tenantList.find(item=> item.houseNo == houseNo.key)
    console.log("***************>>> "+JSON.stringify(list))
    // console.log("***************>>> "+JSON.stringify(houseNo.key))
    if(list == undefined){
      return ""
    }else{
      return list.tName
    }
  }

  const findTenantPnoDetails =(houseNo)=>{
    var list = tenantList.find(item=> item.houseNo == houseNo.key)
    console.log("***************>>> "+JSON.stringify(list))
    // console.log("***************>>> "+JSON.stringify(houseNo.key))
    if(list == undefined){
      return ""
    }else{
      return list.tpNO
    }
  }

  const detailsRow = (item, index) => {
    // console.log(item)
    // findTenantDetails(item)
    return (
      <View key={index} style={{ flexDirection: "row", paddingVertical: 10, borderBottomColor: "#888888", borderBottomWidth: 0.5 }}>
          <Image source={{ uri: item.houseImage }} style={{ height: 50, width: 50, borderRadius: 6 }} />
          <View style={{flex:1}}>
          <View style={{ flexDirection:"row",flex:1,justifyContent:"space-between",paddingLeft:10,alignItems:"center"}}>
            <Text style={styles.detailsTextStyle}>{"House No : "}{item.houseNo}</Text>
            <View style={{ flexDirection: "row"}}>
              <View style={{ height: 20,justifyContent:"center",alignItems:"center", width: 80, borderRadius: 6, backgroundColor: item.status == 2 ?  colors.green : "orange",marginTop:6,marginRight:7 }} >
              <Text style={[item.status == 2 ? styles.statusTextStyle : styles.statusTextStyle]}>{checkStatus(item.status)}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection:"row",justifyContent:"space-between",paddingLeft:10}}>
            <Text style={{fontSize:12}}>{"Tenant Name : "}{findTenantNameDetails(item)} {"  |  "}{findTenantPnoDetails(item)}</Text>

          </View>
          </View>
        {/* </View> */}

        {/* <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "space-between", marginLeft: 10 }}>
            <Text style={styles.detailsTextStyle}>{"House No :"}{item.houseNo}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: 8, width: 8, borderRadius: 50, backgroundColor: colors.green, marginRight: 5 }} />
              <Text style={styles.detailsTextStyle}>{checkStatus(item.status)}</Text>
            </View>
          </View>
          <Image source={{ uri: item.houseImage }} style={{ height: 50, width: 50, borderRadius: 6 }} />

        </View> */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <PageHeader title={label.Report} />
      <TouchableOpacity style={{ borderRadius: 6, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 5, borderColor: colors.subTheme, alignSelf: 'flex-start', marginVertical: 15, marginLeft: 10, backgroundColor: colors.subTheme }}>
        <Text style={{ fontSize: 12, color: colors.black, fontWeight: "600" }}>{"House Report"}</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{ flex: 1, paddingBottom: 60, paddingHorizontal: 10, }}>
          {
            listOfHouseNo.length > 0 ?
              <View style={{}}>
                {/* {headerRow()} */}
                {
                  listOfHouseNo.map((item, index) => {
                    return detailsRow(item, index)
                  })
                }
                {/* {detailsRow()}
              {detailsRow()}
              {detailsRow()}
              {detailsRow()}
              {detailsRow()} */}
              </View>
              : null
          }

        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

//make this component available to the app
export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headertxtStyle: {
    color: colors.black, textAlign: 'center'
  },
  detailsTextStyle: {
    color: colors.black
  },
  statusTextStyle: {
    color: colors.white,
    fontSize:12
  },
  // statusBookedTextStyle: {
  //   color: 'orange',
  //   fontSize:12
  // }
});