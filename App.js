//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootNavigation from './navigation';
import store from './src/redux/store/store';
import {Provider} from 'react-redux';
// create a component
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation initialRouteName={"screen"} />
    </Provider>
  );
};

//make this component available to the app
export default App;