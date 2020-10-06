import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  convertToHtmlString,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import FastImage from 'react-native-fast-image';
import constant from '../../../../../constant';

const SmallListViewText = ({title, text}) => {
  const objectText = convertToObject(text);

  const video =
    objectText.filter(
      (obj: any) =>
        obj.component === 'image' && obj.url.substr(-10) === 'checkVideo',
    )[0] || null;

  const image =
    objectText.filter((obj: any) => obj.component === 'image')[0] || null;

  const representImage = video ? video : image ? image : [];

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
        style={{
          width: constant.width / 2.7,
          height: constant.width / 3.7,
          borderRadius: 10,
        }}
      />
    );
  };

  const summaryText = convertToHtmlString(
    objectText.filter((obj: any) => obj.component === 'text'),
  );

  const textArray = objectText.filter((obj: any) => obj.component === 'text');

  const contentArray = textArray.map((arr) => arr.content);

  const textTest = [];
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

  // 첫번째 - content 병합
  // 두번째 -

  const SummaryTextView = () => {
    const [plus, setPlus] = useState<boolean>(false);
    const renderers = {
      p: (htmlAttribs, children, passProps) => {
        return (
          <Text key={Math.random().toString()} style={{fontSize: 15}}>
            {children}
          </Text>
        );
      },
    };

    return (
      <View style={{}}>
        <View style={{width: constant.width / 2.9}}>
          <Text ellipsizeMode={'tail'} numberOfLines={2}>
            {absorptionText}
          </Text>
        </View>
        {/* <HTML
          html={summaryText}
          renderers={renderers}
          containerStyle={{height: 100}}
          //   alterChildren={(node) => {
          //     const {children, name} = node;
          //     if (children && children.length) {
          //       if (children && children.length > 2) {
          //         setPlus(true);
          //       }
          //       return children.splice(0, 5);
          //     }
          //   }}
          // contentWidth={contentWidth}
        /> */}
      </View>
    );
  };

  return (
    <View>
      <ImageView />
      <View>
        <Text style={{fontWeight: '700', fontSize: 15}}>{title}</Text>
      </View>
      <SummaryTextView />
    </View>
  );
};

export default SmallListViewText;
