import React, {SFC} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import constant from '../../../constant';
import MainImageView from './viewComponents/mainImageView/MainImageView';
import AdvertisementView from './viewComponents/advertisementView/AdvertisementView';
import Question from './viewComponents/question/Question';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: SFC<Props> = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            resizeMode={'contain'}
            source={require('../../../assets/image/logo.png')}
          />
        </View>
        <MainImageView navigation={navigation} />
        <View style={{marginTop: 20}}>
          <AdvertisementView />
        </View>
        <Question navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: constant.width,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 2,
  },
  headerImage: {
    width: constant.width / 4,
    height: constant.height / 18,
  },
});

export default Home;
