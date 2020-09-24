import React, {FunctionComponent} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import constant from '../../../../../constant';
import cStyles from '../../../../../cStyles';

const MainImageView: FunctionComponent<any> = ({navigation}) => {
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
    width: 140,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    bottom: 30,
    left: 30,
    elevation: 7,
  },
  detailButtonText: {
    color: cStyles.LightBlackColor,
  },
});

export default MainImageView;
