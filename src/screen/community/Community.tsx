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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Community: FunctionComponent<Props> = ({navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={{fontWeight: '700'}}>커뮤니티</Text>
        <TouchableOpacity onPress={() => null}>
          <View>
            <IoniconsIcons name={'pencil-sharp'} size={20} color={'black'} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text></Text>
        </View>
      </ScrollView>
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
