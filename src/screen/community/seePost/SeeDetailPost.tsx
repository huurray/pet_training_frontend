import React, {useState} from 'react';
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

const SeeDetailPost = ({navigation}) => {
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
              console.log(111);
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
          {/* <VideoPlayer
            video={{
              uri: url,
            }}
            videoWidth={constant.width}
            videoHeight={
              (constant.width * parseInt(htmlAttribs.height)) /
              parseInt(htmlAttribs.width)
            }
            autoplay={true}
            thumbnail={{
              uri: url,
            }}
            onPlayPress={(e) => console.log(e)}
            onStart={(e) => console.log(e)}
          /> */}
          {/* <Video
            source={{uri: url}} // Can be a URL or a local file.
            style={{
              width: constant.width,
              height:
                (constant.width * parseInt(htmlAttribs.height)) /
                parseInt(htmlAttribs.width),
            }}
            paused={false}
            onLoad={(e) => {
              setPaused(true);
              console.log(e);
            }}
            // onLoadStart={(e) => console.log(e)}
            // Store reference
            //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //  onError={this.videoError}               // Callback when video cannot be loaded
          /> */}
          {/* <VideoPlayerView /> */}
          {/* {paused ? (
            <FastImage
              source={{uri: url}}
              style={{
                width: constant.width,
                height:
                  (constant.width * parseInt(htmlAttribs.height)) /
                  parseInt(htmlAttribs.width),
              }}
            />
          ) : (
            <Video
              source={{uri: url}} // Can be a URL or a local file.
              style={{
                width: constant.width,
                height:
                  (constant.width * parseInt(htmlAttribs.height)) /
                  parseInt(htmlAttribs.width),
              }}
              paused={paused}
              onLoad={(e) => setPaused(true)}
              // Store reference
              //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //  onError={this.videoError}               // Callback when video cannot be loaded
            />
          )} */}
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
          <HTML
            html={post.text}
            renderers={renderers}
            // alterChildren={(node) => {
            //   const {children, name} = node;
            //   if (children && children.length) {
            //     if (children && children.length > 6) {
            //       setPlus(true);
            //     }
            //     return children.splice(0, 5);
            //   }
            // }}
            // contentWidth={contentWidth}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeDetailPost;
