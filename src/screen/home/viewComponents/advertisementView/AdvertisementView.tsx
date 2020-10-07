import React, {FunctionComponent} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import constant from '../../../../../constant';
import cStyles from '../../../../../cStyles';
import {moderateScale} from 'react-native-size-matters';

interface ImageViewProps {
  source: string;
}

const ImageView: FunctionComponent<ImageViewProps> = ({source}) => (
  <View style={styles.imageWrapper}>
    <Image style={styles.image} resizeMode={'cover'} source={{uri: source}} />
  </View>
);

const AdvertisementView: FunctionComponent<any> = ({}) => {
  return (
    <View style={styles.swiperWrapper}>
      <Swiper
        style={styles.swiper}
        showsButtons={false}
        showsPagination={true}
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        paginationStyle={{bottom: 5}}
        dotColor={cStyles.SwiperDeactiveColor}
        activeDotColor={cStyles.SwiperActiveColor}>
        <ImageView
          source={
            'https://pettraining.s3.ap-northeast-2.amazonaws.com/Advertisement/advertising.png'
          }
        />
        <ImageView
          source={
            'https://pettraining.s3.ap-northeast-2.amazonaws.com/Advertisement/advertising.png'
          }
        />
        <ImageView
          source={
            'https://pettraining.s3.ap-northeast-2.amazonaws.com/Advertisement/advertising.png'
          }
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: constant.width,
    alignItems: 'center',
  },
  image: {
    width: constant.width / 1.1,
    height: constant.height / 11.2,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: cStyles.BorderLightGrayColor,
  },
  swiperWrapper: {
    height: 'auto',
  },
  swiper: {
    height: constant.height / 11.2,
  },
});

export default AdvertisementView;
