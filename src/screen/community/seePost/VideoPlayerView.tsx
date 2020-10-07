import React, {useState, useRef, SFC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const VideoPlayerView: SFC<Props> = ({navigation}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setSsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');
  const url = navigation.getParam('url');

  const videoPlayer: any = useRef();

  const onSeek = (seek) => {
    console.log(seek);
    videoPlayer.current.seek(seek);
  };
  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(Math.ceil(data.currentTime));
    }
  };
  const onLoad = (data) => {
    setIsLoading(false);
    setDuration(data.duration);
  };
  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
  };
  const onFullScreen = () => {
    if (screenType == 'contain') {
      setScreenType('cover');
    } else {
      setScreenType('contain');
    }
  };

  const onSeeking = (currentTime) => {
    setCurrentTime(Math.ceil(currentTime));
  };

  return (
    <View style={styles.container}>
      <Video
        onEnd={() => onEnd()}
        onLoad={(data) => onLoad(data)}
        onLoadStart={() => onLoadStart()}
        onProgress={(data) => onProgress(data)}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{uri: url}}
        style={styles.mediaPlayer}
        volume={10}
      />

      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={() => onFullScreen()}
        onPaused={(playerState) => onPaused(playerState)}
        onReplay={() => onReplay()}
        onSeek={(seek) => onSeek(seek)}
        onSeeking={(currentTime) => onSeeking(currentTime)}
        playerState={playerState}
        progress={currentTime}
        fadeOutDelay={2000}
        showOnStart={false}
        toolbarStyle={{}}
        containerStyle={{}}
        isFullScreen={false}
        sliderStyle={{containerStyle: {}, trackStyle: {}, thumbStyle: {}}}>
        <MediaControls.Toolbar>
          <View style={styles.toolbar}>
            <Text>I'm a custom toolbar </Text>
          </View>
        </MediaControls.Toolbar>
      </MediaControls>
      {isLoading ? (
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={() => onFullScreen()}
          onPaused={(playerState) => onPaused(playerState)}
          onReplay={() => onReplay()}
          onSeek={(seek) => onSeek(seek)}
          onSeeking={(currentTime) => onSeeking(currentTime)}
          playerState={playerState}
          progress={currentTime}
          fadeOutDelay={2000}
          toolbarStyle={{}}
          containerStyle={{}}
          isFullScreen={false}
          sliderStyle={{containerStyle: {}, trackStyle: {}, thumbStyle: {}}}>
          <MediaControls.Toolbar>
            <View style={styles.toolbar}>
              <Text>I'm a custom toolbar </Text>
            </View>
          </MediaControls.Toolbar>
        </MediaControls>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default VideoPlayerView;
