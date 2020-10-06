import React, {FunctionComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import constant from '../../../constant';
import {IoniconsIcons} from '../../components/icons/RnIcons';
import PostScreenView from './seePost/PostScreenView';

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
            <IoniconsIcons name={'pencil-sharp'} size={20} color={'black'} />
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
    height: 70,
    backgroundColor: 'white',
    elevation: 2,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Community;
