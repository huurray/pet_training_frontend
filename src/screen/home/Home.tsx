import React, {FunctionComponent} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import constant from '../../../constant';
import MainImageView from './viewComponents/mainImageView/MainImageView';
import AdvertisementView from './viewComponents/advertisementView/AdvertisementView';
import Question from './viewComponents/question/Question';

const Home: FunctionComponent<void> = ({}) => {
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
        <MainImageView />
        <AdvertisementView />
        <Question />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: constant.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerImage: {
    width: constant.width / 4,
    height: constant.height / 18,
  },
});

export default Home;
