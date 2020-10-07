import React, {FunctionComponent, useState, SFC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import cStyles from '../../../../../cStyles';
import constant from '../../../../../constant';
import SmallListView from './SmallListView';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Question: SFC<Props> = ({navigation}) => {
  const kindOfPet = ['강아지', '고양이'];
  const [petType, setPetType] = useState('강아지');
  return (
    <View>
      <View style={style.titleWrapper}>
        <Text style={style.title}>궁금해요</Text>
        <View style={{marginRight: constant.moderateScale(10)}}>
          <Text style={{color: cStyles.TabActiveColor}}>더보기</Text>
        </View>
      </View>
      <View style={style.kindOfPetWrapper}>
        {kindOfPet.map((pet, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => setPetType(pet)}>
            <View
              style={[
                style.kindOfPer,
                {
                  borderColor:
                    petType === pet
                      ? cStyles.ButtonActiveColor
                      : cStyles.SwiperDeactiveColor,
                  borderRadius: constant.width / 6 / 2,
                  backgroundColor:
                    petType === pet ? cStyles.ButtonActiveColor : 'white',
                },
              ]}>
              <Text
                style={{
                  color:
                    petType === pet ? 'white' : cStyles.SwiperDeactiveColor,
                  fontSize: constant.moderateScale(12),
                }}>
                {pet}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <SmallListView navigation={navigation} petType={petType} />
    </View>
  );
};

const style = StyleSheet.create({
  titleWrapper: {
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: constant.moderateScale(20),
  },
  kindOfPetWrapper: {
    flexDirection: 'row',
    marginTop: constant.moderateScale(10),
    marginLeft: constant.moderateScale(10),
  },
  kindOfPer: {
    width: constant.width / 5,
    height: constant.width / 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Question;
