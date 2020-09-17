import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../src/screen/home/Home';
import Community from '../src/screen/community/Community';
import Training from '../src/screen/training/Training';
import MyPage from '../src/screen/myPage/MyPage';
import {
  ActiveIoniconsIcons,
  ActiveMaterialCommunityIcons,
} from '../src/components/activeRnIcons/activeRnIcons';
import cStyles from '../cStyles';

export default createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        Home: {
          screen: Home,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <ActiveIoniconsIcons
            active={focused}
            activeName={'home'}
            activeColor={cStyles.TabActiveColor}
            deactiveColor={cStyles.TabDeactiveColor}
            size={25}
            deactiveName={'home-outline'}
          />
        ),
      },
    },

    Community: {
      screen: createStackNavigator({
        Community: {
          screen: Community,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <ActiveIoniconsIcons
            active={focused}
            activeName={'md-color-filter'}
            activeColor={cStyles.TabActiveColor}
            deactiveColor={cStyles.TabDeactiveColor}
            size={25}
            deactiveName={'md-color-filter-outline'}
          />
        ),
      },
    },
    Training: {
      screen: createStackNavigator({
        Training: {
          screen: Training,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <ActiveMaterialCommunityIcons
            active={focused}
            activeName={'account-search'}
            activeColor={cStyles.TabActiveColor}
            deactiveColor={cStyles.TabDeactiveColor}
            size={25}
            deactiveName={'account-search'}
          />
        ),
      },
    },
    MyPage: {
      screen: createStackNavigator({
        MyPage: {
          screen: MyPage,
          navigationOptions: {
            headerShown: false,
          },
        },
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <ActiveIoniconsIcons
            active={focused}
            activeName={'person'}
            activeColor={cStyles.TabActiveColor}
            deactiveColor={cStyles.TabDeactiveColor}
            size={25}
            deactiveName={'person-outline'}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      style: {
        height: 60,
      },
      labelStyle: {
        fontSize: 15,
      },
      showLabel: false,
    },
  },
);
