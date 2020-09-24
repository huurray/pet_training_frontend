import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TabNavigation from './TapNavigation';
import AuthNavigation from './AuthNavigation';
import MoveToDetail from '../src/screen/home/viewComponents/mainImageView/MoveToDetail';

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    AuthNavigation,
    MoveToDetail,
  },
  {headerMode: 'none'},
);

export default createAppContainer(MainNavigation);
