import React, {FunctionComponent, useState} from 'react';
import {View, Text} from 'react-native';
import cStyles from '../../../../../cStyles';
import constant from '../../../../../constant';
import SmallListView from './SmallListView';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Question: FunctionComponent<any> = ({navigation}) => {
  const kindOfPet = ['강아지', '고양이'];
  const [petType, setPetType] = useState('강아지');
  return (
    <View>
      <View
        style={{
          marginTop: 20,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: constant.moderateScale(20)}}>궁금해요</Text>
        <View style={{marginRight: constant.moderateScale(10)}}>
          <Text style={{color: cStyles.TabActiveColor}}>더보기</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: constant.moderateScale(10),
          marginLeft: constant.moderateScale(10),
        }}>
        {kindOfPet.map((pet, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => setPetType(pet)}>
            <View
              style={{
                width: constant.width / 5,
                height: constant.width / 12,
                borderWidth: 1,
                borderColor:
                  petType === pet
                    ? cStyles.ButtonActiveColor
                    : cStyles.SwiperDeactiveColor,
                borderRadius: constant.width / 6 / 2,
                backgroundColor:
                  petType === pet ? cStyles.ButtonActiveColor : null,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
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

export default Question;
