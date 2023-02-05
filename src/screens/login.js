//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback, TextInput, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../utils/colors';
import LoginIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/AntDesign';
import { label } from '../utils/labels';
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../utils/screenName';

import database from '@react-native-firebase/database';
import { doLogin } from '../commonfunctions/firebaseMethods';
import { changeSpinnerFlag, storeUserDetails } from '../commonfunctions/commonMethods';


// create a component
const Login = () => {

  const [email, setEmail] = useState('jsriganesh535@gmail.com')
  const [password, setPassword] = useState('password')
  const [errormessage, setErrorMessage] = useState('')
  var navigation = useNavigation()



  const login = async () => {
    changeSpinnerFlag(true)
    const result = await doLogin(email, password)
    changeSpinnerFlag(false)

    if (result.status) {
      storeUserDetails(result)
      setErrorMessage('')
      navigation.navigate(ScreenName.Home)
    } else {
      setErrorMessage(result.message)
    }


    // SmsAndroid.autoSend(
    //   "8344233713",
    //   // "9688743938",
    //   " ==== message ",
    //   (fail) => {
    //     console.log("message send error ---- "+JSON.stringify(fail));

    //   //   this.showLoader(false)
    //   },
    //   (success) => {
    //       console.log("message send success ---- "+JSON.stringify(success));
    //   },
    // );


  }


  const loginModal = () => {
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={[styles.modalOverlay]} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContentContainer}>
          <View style={{ flexDirection: 'row', backgroundColor: colors.black, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.subTheme,
                flex: 1,
                textAlign: 'center',
                marginVertical: 8,
              }}>
              {label.login}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
            <View style={styles.textboxRow}>
              <LoginIcon name='email' size={25} color={colors.black} />
              <TextInput placeholder={label.enterEmail} style={{ flex: 1, marginLeft: 10, color: colors.black, fontSize: 14 }} value={email} onChangeText={(text) => { setEmail(text) }} />
            </View>

            <View style={[styles.textboxRow]}>
              <LoginIcon name='form-textbox-password' size={25} color={colors.black} />
              <TextInput secureTextEntry={true} placeholder={label.enterPassword} style={{ flex: 1, marginLeft: 10, color: colors.black, fontSize: 14 }} value={password} onChangeText={(text) => { setPassword(text) }} />
            </View>
            {
              errormessage == '' ?
                null :
                <Text style={styles.errorTextStyle}>{errormessage}</Text>
            }

            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
              if (email && password) {
                login()
              } else {
                alert("Plsease enter the email and password")
              }
            }}>
              <Text style={styles.buttonLogin}>{label.submitLogin}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


  return (
    <ImageBackground style={styles.container} source={require("../../assets/images/bgImage.jpg")}>
      {loginModal()}
    </ImageBackground>
  );
};

//make this component available to the app
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:""
  },
  errorTextStyle: {
    fontSize: 12,
    color: colors.red
  },
  textboxRow: {
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: 'row',
    height: 45,
    marginTop: 25
  },
  modalContentContainer: {
    // position: 'absolute',
    // height: '50%',
    width: '85%',
    bottom: 10,
    // justifyContent: ,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 22,
    paddingBottom: 35,
    // paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // alignItems: "center",
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    right: 0,
  },
  buttonLogin: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.subTheme,
    textAlign: 'center'
  },
  buttonStyle: {
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.black,
    borderRadius: 6
  },
});