import React, {useState, SFC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  convertToHtmlString,
  convertToObject,
} from 'react-native-cn-richtext-editor';
import HTML from 'react-native-render-html';
import constant from '../../../../constant';
import FastImage from 'react-native-fast-image';
import {MaterialIcons} from '../../../components/icons/RnIcons';
import cStyles from '../../../../cStyles';

interface Props {
  text: string;
}

const PostText: SFC<Props> = ({text}) => {
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
      />
      {plus ? <Text style={styles.plusText}>더보기</Text> : null}
      {convertToObject(summaryImage).length === 1 ? (
        convertToObject(summaryImage).map((item: any, index) => (
          <View key={index}>
            {item.url.substr(-10) === 'checkVideo' ? (
              <>
                <FastImage
                  source={{uri: item.url.substr(0, item.url.length - 10)}}
                  style={styles.image}
                />
                <View style={styles.playIcon}>
                  <MaterialIcons
                    name={'play-circle-fill'}
                    size={60}
                    color={cStyles.BorderLightGrayColor}
                  />
                </View>
              </>
            ) : (
              <FastImage source={{uri: item.url}} style={styles.image} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  plusText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: constant.width,
    height: 300,
  },
  playIcon: {
    position: 'absolute',
    width: constant.width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostText;
