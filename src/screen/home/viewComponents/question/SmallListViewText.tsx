import React, {useState, useEffect, SFC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  convertToHtmlString,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import FastImage from 'react-native-fast-image';
import constant from '../../../../../constant';
import {moderateScale} from 'react-native-size-matters';

interface Props {
  title: string;
  text: string;
}

const SmallListViewText: SFC<Props> = ({title, text}) => {
  const objectText = convertToObject(text);
  const video =
    objectText.filter(
      (obj: any) =>
        obj.component === 'image' && obj.url.substr(-10) === 'checkVideo',
    )[0] || null;

  const image =
    objectText.filter((obj: any) => obj.component === 'image')[0] || null;

  const representImage: any = video ? video : image ? image : [];

  const ImageView = () => {
    let url = representImage.url;

    if (url === undefined) {
      url = null;
    } else if (url.substr(-10) === 'checkVideo') {
      url = url.substr(0, url.length - 10);
    } else {
      null;
    }

    return (
      <FastImage
        source={
          url
            ? {uri: url}
            : require('../../../../../assets/image/basicImage.jpg')
        }
        style={styels.image}
      />
    );
  };

  const textArray = objectText.filter((obj: any) => obj.component === 'text');

  const contentArray = textArray.map((arr: any) => arr.content);

  const textTest: any = [];
  const [absorptionText, setAbsorptionText] = useState('');

  useEffect(() => {
    if (contentArray.length > 0) {
      for (let i = 0; i < contentArray.length; i++) {
        for (let j = 0; j < contentArray[i].length; j++) {
          textTest.push(contentArray[i][j].text);
        }
      }
      setAbsorptionText(textTest.toString().replace(/,/g, ' '));
      console.log(textTest.toString().replace(/,/g, ' '));
    }
  }, []);

  const SummaryTextView = () => {
    return (
      <View style={styels.textWrapper}>
        <Text ellipsizeMode={'tail'} numberOfLines={2}>
          {absorptionText}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <ImageView />
      <View>
        <Text style={styels.title}>{title}</Text>
      </View>
      <SummaryTextView />
    </View>
  );
};

const styels = StyleSheet.create({
  image: {
    width: constant.width / 2.7,
    height: constant.width / 3.7,
    borderRadius: moderateScale(10),
  },
  title: {
    fontWeight: '700',
    fontSize: moderateScale(15),
  },
  textWrapper: {
    width: constant.width / 2.9,
  },
});

export default SmallListViewText;
