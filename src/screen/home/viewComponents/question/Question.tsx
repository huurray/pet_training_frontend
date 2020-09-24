import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';
import cStyles from '../../../../../cStyles';
import constant from '../../../../../constant';

const Question: FunctionComponent<any> = ({}) => {
  const kindOfPet = ['강아지', '고양이', '미어캣', '앵무새', '이구아나'];
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
          <View
            key={index}
            style={{
              width: constant.width / 5,
              height: constant.width / 12,
              borderWidth: 1,
              borderColor: cStyles.SwiperDeactiveColor,
              borderRadius: constant.width / 6 / 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: cStyles.SwiperDeactiveColor,
                fontSize: constant.moderateScale(12),
              }}>
              {pet}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Question;
