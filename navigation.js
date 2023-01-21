import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OverLaySpinner} from './src/components/overLay';
import {connect} from 'react-redux';
import Home from './src/screens/home';
import { ScreenName } from './src/utils/screenName';
import Login from './src/screens/login';
import Tenant from './src/screens/tenant';
import House from './src/screens/house';
import Report from './src/screens/report';
import Profile from './src/screens/profile';
import { CreateTenant } from './src/screens/createTenant';
import { CreateHouse } from './src/screens/createHouse';
import PaymentScreen from './src/screens/paymentScreen';
import SettlementScreen from './src/screens/settlement';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import SideMenu from './src/components/sideMenu';
// import PdfViewer from './src/pages/pdfView';

const HomeNavigation = props => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}
    >
      <Stack.Screen name={ScreenName.Home} component={Home} />
      <Stack.Screen name={ScreenName.Login} component={Login} />
      <Stack.Screen name={ScreenName.Tenant} component={Tenant} />
      <Stack.Screen name={ScreenName.House} component={House} />
      <Stack.Screen name={ScreenName.Report} component={Report} />
      <Stack.Screen name={ScreenName.Profile} component={Profile} />
      <Stack.Screen name={ScreenName.CreateTenant} component={CreateTenant} />
      <Stack.Screen name={ScreenName.CreateHouse} component={CreateHouse} />
      <Stack.Screen name={ScreenName.PaymentScreen} component={PaymentScreen} />
      <Stack.Screen name={ScreenName.SettlementScreen} component={SettlementScreen} />
      
      
    </Stack.Navigator>
  );
};

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator 
//     // screenOptions={{swipeEnabled: false}}
//     screenOptions={{
//       activeTintColor: '#e91e63',
//       itemStyle: { marginVertical: 5 },
//     }}
//     drawerContent={(props) => <SideMenu {...props} />}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeNavigation}
//         options={{headerShown: false}}
//       />
//     </Drawer.Navigator>
//   );
// };

const RootNavigation = props => {
  return (
    <NavigationContainer>
      {/* <DrawerNavigator /> */}

      <HomeNavigation />
      <OverLaySpinner visible={props.spinnerFlag} />
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  spinnerFlag: state.overLayReducer.spinnerFlag,
});
export default connect(mapStateToProps)(RootNavigation);
