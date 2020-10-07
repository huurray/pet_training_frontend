import React, {FunctionComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import constant from '../../../constant';
import {IoniconsIcons} from '../../components/icons/RnIcons';
import PostScreenView from './seePost/PostScreenView';
import {moderateScale, verticalScale} from 'react-native-size-matters';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Community: FunctionComponent<Props> = ({navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={{fontWeight: '700'}}>커뮤니티</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePostView')}>
          <View>
            <IoniconsIcons
              name={'pencil-sharp'}
              size={moderateScale(20)}
              color={'black'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <PostScreenView navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: constant.width,
    height: verticalScale(50),
    backgroundColor: 'white',
    elevation: 2,
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Community;
