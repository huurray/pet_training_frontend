import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  convertToHtmlString,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import HTML from 'react-native-render-html';
import constant from '../../../../constant';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {MaterialIcons} from '../../../components/icons/RnIcons';
import cStyles from '../../../../cStyles';

const PostText = ({text}) => {
  const fontSize = 15;
  const objectText = convertToObject(text);

  const summaryText = convertToHtmlString(
    objectText.filter((obj: any) => obj.component === 'text'),
  );

  const summaryImage = convertToHtmlString(
    objectText.filter((obj: any) => obj.component === 'image'),
  );

  const [plus, setPlus] = useState<boolean>(false);

  const renderers = {
    p: (htmlAttribs, children, passProps) => {
      return (
        <Text key={Math.random().toString()} style={{fontSize: fontSize}}>
          {children}
        </Text>
      );
    },
  };

  return (
    <View>
      <HTML
        html={summaryText}
        renderers={renderers}
        alterChildren={(node) => {
          const {children, name} = node;
          if (children && children.length) {
            if (children && children.length > 6) {
              setPlus(true);
            }
            return children.splice(0, 5);
          }
        }}
        // contentWidth={contentWidth}
      />
      {plus ? (
        <Text
          style={{
            fontWeight: '700',
            textDecorationLine: 'underline',
            marginBottom: 10,
            marginTop: 10,
          }}>
          더보기
        </Text>
      ) : null}
      {convertToObject(summaryImage).length === 1 ? (
        convertToObject(summaryImage).map((item: any, index) => (
          <View key={index}>
            {item.url.substr(-10) === 'checkVideo' ? (
              <>
                <FastImage
                  source={{uri: item.url.substr(0, item.url.length - 10)}}
                  style={{width: constant.width, height: 300}}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: constant.width,
                    height: 300,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name={'play-circle-fill'}
                    size={60}
                    color={cStyles.BorderLightGrayColor}
                  />
                </View>
              </>
            ) : (
              <FastImage
                source={{uri: item.url}}
                style={{width: constant.width, height: 300}}
              />
            )}
          </View>
        ))
      ) : convertToObject(summaryImage).length === 2 ? (
        <View style={{flexDirection: 'row'}}>
          {convertToObject(summaryImage).map((item: any, index) => (
            <View key={index}>
              {item.url.substr(-10) === 'checkVideo' ? (
                <>
                  <FastImage
                    source={{uri: item.url.substr(0, item.url.length - 10)}}
                    style={{
                      width: constant.width / 2 || 0,
                      height: 150,
                      marginRight: index === 0 ? 1 : null || 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      width: constant.width / 2,
                      height: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'play-circle-fill'}
                      size={60}
                      color={cStyles.BorderLightGrayColor}
                    />
                  </View>
                </>
              ) : (
                // <Video
                //   source={{uri: item.url.substr(0, item.url.length - 10)}}
                //   style={{
                //     width: constant.width / 2 || 0,
                //     height: 150,
                //     marginRight: index === 0 ? 1 : null || 0,
                //   }} // Can be a URL or a local file.
                //   // Store reference
                //   // Callback when video cannot be loaded
                // />
                <FastImage
                  source={{uri: item.url}}
                  style={{
                    width: constant.width / 2 || 0,
                    height: 150,
                    marginRight: index === 0 ? 1 : null || 0,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      ) : convertToObject(summaryImage).length === 3 ? (
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {convertToObject(summaryImage).map((item: any, index) => (
            <View key={index}>
              <FastImage
                source={{uri: item.url}}
                style={{
                  width:
                    index === 0
                      ? constant.width
                      : index === 1
                      ? constant.width / 2 - 1
                      : constant.width / 2 || 0,
                  height: 150,
                  marginRight: index === 1 ? 1 : null || 0,
                }}
              />
            </View>
          ))}
        </View>
      ) : null}
      {/* {convertToObject(summaryImage).map((item, index) => (    
        <View key={index}>
          <Image
            source={{uri: item.url}}
            style={{width: constant.width, height: 300}}
          />
        </View>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export default PostText;
