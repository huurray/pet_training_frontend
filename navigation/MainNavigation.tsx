import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import TabNavigation from './TapNavigation';
import AuthNavigation from './AuthNavigation';
import MoveToDetail from '../src/screen/home/viewComponents/mainImageView/MoveToDetail';
import CreatePostView from '../src/screen/community/createPost/CreatePostView';
import SeeDetailPost from '../src/screen/community/seePost/SeeDetailPost';
import VideoPlayerView from '../src/screen/community/seePost/VideoPlayerView';

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    AuthNavigation,
    MoveToDetail,
    CreatePostView,
    SeeDetailPost,
    VideoPlayerView,
  },
  {headerMode: 'none'},
);

export default createAppContainer(MainNavigation);
