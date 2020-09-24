import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {View, Text} from 'react-native';
import Login from '../src/screen/auth/Login';

const AuthNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{fontSize: 15, fontWeight: '700'}}>로그인</Text>
        </View>
      ),
    },
  },
});

export default createAppContainer(AuthNavigation);
