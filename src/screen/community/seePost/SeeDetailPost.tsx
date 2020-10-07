import React, {useState, SFC} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PostText from './PostText';
import HTML from 'react-native-render-html';
import constant from '../../../../constant';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import VideoPlayerView from './VideoPlayerView';
import FastImage from 'react-native-fast-image';
import {MaterialIcons} from '../../../components/icons/RnIcons';
import cStyles from '../../../../cStyles';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SeeDetailPost: SFC<Props> = ({navigation}) => {
  const post = navigation.getParam('post');

  const renderers = {
    p: (htmlAttribs, children, passProps) => {
      return (
        <Text key={Math.random().toString()} style={{fontSize: 15}}>
          {children}
        </Text>
      );
    },
    img: (htmlAttribs, children, passProps) => {
      let url;
      let video;
      if (htmlAttribs.src.substr(-10) === 'checkVideo') {
        url = htmlAttribs.src.substr(0, htmlAttribs.src.length - 10);
        video = true;
      } else {
        url = htmlAttribs.src;
        video = false;
      }
      return video ? (
        <View key={Math.random().toString()} style={{marginTop: 10}}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('VideoPlayerView', {url});
            }}>
            <View>
              <FastImage
                source={{
                  uri: url,
                }}
                style={{
                  width: constant.width,
                  height:
                    (constant.width * parseInt(htmlAttribs.height)) /
                    parseInt(htmlAttribs.width),
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  width: constant.width,
                  height:
                    (constant.width * parseInt(htmlAttribs.height)) /
                    parseInt(htmlAttribs.width),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={'play-circle-fill'}
                  size={70}
                  color={cStyles.BorderLightGrayColor}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <View
          key={Math.random().toString()}
          style={{
            width: constant.width,
            alignContent: 'center',
            marginTop: 10,
          }}>
          <Image
            source={{
              uri: url,
            }}
            style={{
              width: constant.width,
              height:
                (constant.width * parseInt(htmlAttribs.height)) /
                parseInt(htmlAttribs.width),
            }}
          />
        </View>
      );
    },
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flexGrow: 1}}>
        <View
          style={{
            paddingTop: 10,
            backgroundColor: 'white',
            marginBottom: 10,
          }}>
          <Text style={{fontWeight: '700', fontSize: 20, marginBottom: 10}}>
            {post.title}
          </Text>
          <HTML html={post.text} renderers={renderers} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeDetailPost;
