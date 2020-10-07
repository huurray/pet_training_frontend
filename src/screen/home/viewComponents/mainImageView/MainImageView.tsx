import React, {FunctionComponent, SFC} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import constant from '../../../../../constant';
import cStyles from '../../../../../cStyles';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const MainImageView: SFC<Props> = ({navigation}) => {
  return (
    <View>
      <View>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={require('../../../../../assets/image/homeMain.png')}
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MoveToDetail');
        }}>
        <View style={styles.detailButtonWrapper}>
          <Text style={styles.detailButtonText}>자세히 보러가기</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: constant.width,
    height: constant.height / 2.2,
  },
  detailButtonWrapper: {
    position: 'absolute',
    width: scale(130),
    height: verticalScale(35),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    bottom: moderateScale(30),
    left: moderateScale(30),
    elevation: 7,
  },
  detailButtonText: {
    color: cStyles.LightBlackColor,
  },
});

export default MainImageView;
